// src/services/authService.ts
import { getUserByEmail, updateUser } from '../repositories/userRepository'
import { randomBytes } from 'crypto'
import bcrypt from 'bcrypt'
import dayjs from 'dayjs'

export const solicitarRecuperacion = async (email: string, backendUrl: string) => {
  const user = await getUserByEmail(email)
  if (!user) throw new Error('Usuario no encontrado')

  const token = randomBytes(32).toString('hex')
  const expiresAt = dayjs().add(15, 'minute').toDate()

  await updateUser(user.id, {
    resetPasswordToken: token,
    resetTokenExpiresAt: expiresAt
  })

  const link = `${backendUrl}/api/auth/reset-password?token=${token}&email=${email}`

  // se devuelve ambos por si se necesitan
  return { link, token, email }
}

export const restablecerPassword = async (token: string, email: string, newPassword: string) => {
  const user = await getUserByEmail(email)
  if (!user) throw new Error('Usuario no encontrado')
  if (user.resetPasswordToken !== token) throw new Error('Token inválido o expirado')
  if (new Date(user.resetTokenExpiresAt!) < new Date()) throw new Error('Token expirado')

  const hashed = await bcrypt.hash(newPassword, 10)

  await updateUser(user.id, {
    password: hashed,
    resetPasswordToken: null,
    resetTokenExpiresAt: null
  })

  return true
}
