// ========================================
// ARCHIVO: src/repositories/loginRepository.ts
// Descripción: Lógica de autenticación y acceso a datos
// ========================================

import { Prisma } from '@prisma/client'
import prisma from '../config/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { LoginDTO, LoginResponseDTO } from '../dto/loginDTO'
import crypto from 'crypto'
import { getCompanyByUserEmail } from './userRepository'

type JwtPayload = {
  userId: string
  email: string
}

/**
 * Genera un secreto TOTP aleatorio en base32
 */
function generateTOTPSecret(): string {
  const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  let secret = ''
  for (let i = 0; i < 32; i++) {
    // 32 chars = 160 bits
    secret += base32Chars.charAt(Math.floor(Math.random() * base32Chars.length))
  }
  return secret
}

/**
 * Función para verificar código TOTP sin librerías externas
 */
function verifyTOTP(secret: string, token: string, window: number = 2): boolean {
  const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  const secretBytes: number[] = []
  const cleanSecret = secret.replace(/\s/g, '').toUpperCase() // Remover espacios y convertir a mayúsculas

  for (let i = 0; i < cleanSecret.length; i++) {
    const char = cleanSecret.charAt(i)
    const index = base32Chars.indexOf(char)
    if (index === -1) return false // Secreto inválido
    secretBytes.push(index)
  }

  // Convertir de base32 a bytes (5 bits por char a 8 bits)
  const bytes: number[] = []
  let bits = 0
  let value = 0
  for (const byte of secretBytes) {
    value = (value << 5) | byte
    bits += 5
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 0xff)
      bits -= 8
    }
  }

  const timeStep = 30
  const currentTime = Math.floor(Date.now() / 1000 / timeStep)

  for (let offset = -window; offset <= window; offset++) {
    const time = currentTime + offset
    const timeBytes = Buffer.alloc(8)
    timeBytes.writeBigUInt64BE(BigInt(time), 0)

    const hmac = crypto.createHmac('sha1', Buffer.from(bytes))
    hmac.update(timeBytes)
    const hash = hmac.digest()

    const offsetByte = hash[hash.length - 1] & 0x0f
    const code =
      ((hash[offsetByte] & 0x7f) << 24) |
      ((hash[offsetByte + 1] & 0xff) << 16) |
      ((hash[offsetByte + 2] & 0xff) << 8) |
      (hash[offsetByte + 3] & 0xff)

    const generatedToken = (code % 1000000).toString().padStart(6, '0')
    if (generatedToken === token) {
      return true
    }
  }
  return false
}

// Define el enum Role (asegúrate que coincida con tu schema.prisma)
enum Role {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  PYME = 'PYME'
}

/**
 * Login de usuario
 * @param email - Email del usuario
 * @param password - Contraseña en texto plano
 * @returns Token JWT y datos del usuario
 */
export const login = async (loginData: LoginDTO): Promise<LoginResponseDTO> => {
  const { email, password, twoFactorCode } = loginData

  // 1. Buscar usuario por email (incluir password y twoFactorSecret)
  const user = await prisma.user.findFirst({
    where: {
      AND: [{ email: email.toLowerCase().trim() }]
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
      isActive: true,
      loginAttempts: true,
      lockedUntil: true,
      twoFactorSecret: true
    }
  })

  // 2. Si no existe el usuario, mensaje genérico
  if (!user) {
    throw new Error('Credenciales incorrectas')
  }

  // 3. Verificar si la cuenta está bloqueada
  if (user.lockedUntil && new Date() < user.lockedUntil) {
    const minutesRemaining = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000)
    throw new Error(`Cuenta bloqueada. Intenta nuevamente en ${minutesRemaining} minutos`)
  }

  // 4. Verificar contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    // Incrementar intentos fallidos
    const nextAttempts = (user.loginAttempts ?? 0) + 1
    const updates: { loginAttempts: number; lockedUntil?: Date | null } = { loginAttempts: nextAttempts }
    if (nextAttempts >= 5) {
      updates.lockedUntil = new Date(Date.now() + 15 * 60 * 1000)
    }
    await prisma.user.update({
      where: { email: email.toLowerCase().trim() },
      data: updates
    })

    // Mensaje genérico (no revelar si el email existe)
    throw new Error('Credenciales incorrectas')
  }

  // 5. Verificar que la cuenta esté activa
  if (!user.isActive) {
    throw new Error('Credenciales incorrectas. Cuenta desactivada')
  }

  // 6. Verificar 2FA si está activado
  //   if (user.twoFactorSecret && user.twoFactorSecret.trim() !== '') {
  //
  //     // 2FA ACTIVADO: requiere código adicional
  //
  //     if (!twoFactorCode) {
  //
  //       return {
  //
  //         success: false,
  //
  //         requiresTwoFactor: true,
  //
  //         message: 'Se requiere código de autenticación de dos factores'
  //
  //       }
  //
  //     }
  //
  //
  //
  //     // Verificar código TOTP (para testing, aceptar "123456" como código fijo)
  //
  //     const isValidTOTP = twoFactorCode === '123456' || verifyTOTP(user.twoFactorSecret, twoFactorCode, 2)
  //
  //
  //
  //     if (!isValidTOTP) {
  //
  //       throw new Error('Código 2FA inválido')
  //
  //     }
  //
  //   }

  // 7. Login exitoso: resetear intentos y actualizar último login
  await prisma.user.update({
    where: { email: email.toLowerCase().trim() },
    data: {
      loginAttempts: 0,
      lockedUntil: null,
      lastLogin: new Date()
    }
  })

  // 8. Generar JWT
  const payload: JwtPayload = {
    userId: user.id,
    email: user.email
  }

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'changeme', {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  })

  const companyUser = await getCompanyByUserEmail(user.email)

  // 9. Retornar respuesta exitosa
  return {
    success: true,
    accessToken,
    user: {
      id: user.id,
      email: user.email
    },
    company: {
      id: companyUser?.id,
      legalName: companyUser?.legalName,
      taxId: companyUser?.taxId,
      altEmail: companyUser?.altEmail,
      phone: companyUser?.phone
    },
    message: 'Login exitoso'
  }
}

/**
 * Verificar estado de cuenta
 * (Útil para endpoints protegidos)
 */
export const verifyUser = async (userId: string): Promise<any | null> => {
  return await prisma.user.findUnique({
    where: { id: userId, isActive: true }
  })
}

/**
 * Función de utilidad para parsear roles
 */
export const parseRole = (roleStr: string): Role => {
  const upperRole = roleStr.toUpperCase()
  if (upperRole in Role) {
    return Role[upperRole as keyof typeof Role]
  }
  throw new Error('Rol inválido')
}
