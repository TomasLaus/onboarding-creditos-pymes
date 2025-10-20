import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { randomBytes } from 'crypto'
import {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  activateUser,
  updateUser,
  deleteAllUsers
} from '../repositories/userRepository'
import { CreateUserDTO, CreateUserResponseOKDTO, CreateUserResponseErrorDTO } from '../dto/userDTO'
import { Company, User } from '@prisma/client'
import { createCompany, getCompanyByTaxId } from '../repositories/companyRepository'
import { validarIdentificacionFiscal } from '../utils/validacion-pymes-function'
import dayjs from 'dayjs'
import { enviarEmailActivacion } from '../utils/enviar-email-activacion'
import { verifyToken } from '../utils/jwt'
import authMiddleware from '../middlewares/authMiddleware'

export const create = async (req: Request, res: Response) => {
  try {
    const postBodyData: CreateUserDTO = req.body

    if (
      !postBodyData.password ||
      !postBodyData.email ||
      !postBodyData.legalName ||
      !postBodyData.taxId ||
      !postBodyData.phone
    ) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.' })
    }

    if (!validarIdentificacionFiscal(postBodyData.taxId)) {
      return res.status(400).json({ message: 'El RUC/NIT/CUIT/RUT de contribuyente no es válido.' })
    }

    const exist = await getUserByEmail(postBodyData.email)
    const exist2 = await getCompanyByTaxId(postBodyData.taxId)

    if (exist) {
      return res.status(409).json({ message: 'ese usuario ya existe. verificar email.' })
    }
    if (exist2) {
      return res.status(409).json({ message: 'esa empresa ya existe. verificar RUC/NIT/CUIT/RUT.' })
    }

    // Generar token de activación
    const token = randomBytes(32).toString('hex')
    const expiresAt = dayjs().add(15, 'minute').toDate() // 15 min de expiración

    //hashear pass
    const hashedPassword = await bcrypt.hash(postBodyData.password, 10)

    enviarEmailActivacion(process.env.FRONTEND_URL, postBodyData.email, token, 'Haz click aquí para activar tu cuenta.')

    const userToInsert: User = {
      email: postBodyData.email,
      password: hashedPassword,
      twoFactorSecret: postBodyData.twoFactorSecret,
      activationToken: token,
      tokenExpiresAt: expiresAt.toString()
    } as User

    const createdUser: User = await createUser(userToInsert)

    const companyToInsert: Company = {
      legalName: postBodyData.legalName,
      taxId: postBodyData.taxId,
      phone: postBodyData.phone,
      userId: createdUser.id
    } as Company

    const createdCompany: Company = await createCompany(companyToInsert)

    interface tempDTO {
      tokenActivacion: string
    }
    const responseUser: CreateUserResponseOKDTO & tempDTO = {
      email: createdUser.email,
      legalName: createdCompany.legalName,
      taxId: createdCompany.taxId,
      phone: createdCompany.phone,
      tokenActivacion: token
    }

    res.status(201).json({
      message: 'Usuario creado exitosamente.',
      data: responseUser
    })
  } catch (err: any) {
    const responseError: CreateUserResponseErrorDTO = {
      message: 'Error creando usuario.',
      error: err
    }
    res.status(500).json(responseError)
  }
}

export const activate = async (req: Request, res: Response) => {
  try {
    const { token, email } = req.query

    if (!token || !email) return res.status(400).send('Token o email faltante')

    const user = await getUserByEmail(String(email))
    if (!user) return res.status(404).send({ message: 'Usuario no encontrado' })
    if (user.isActive) return res.status(400).send({ message: 'Cuenta ya activada' })
    if (user.activationToken !== token) return res.status(400).send({ message: 'Token inválido' })
    if (new Date(user.tokenExpiresAt) < new Date()) return res.status(400).send({ message: 'Token expirado' })

    await updateUser(user.id, {
      isActive: true,
      activationToken: null,
      tokenExpiresAt: null
    })

    res.send({ message: 'Cuenta activada correctamente. Ya puedes iniciar sesión.' })
  } catch (err: any) {
    res.status(500).send({ message: err.message, error: err })
  }
}

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { id, oldPassword, newPassword } = req.body

    if (!id || !oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.' })
    }

    const user = await getUserById(id)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' })
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta.' })
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
    await updateUser(user.id, { password: hashedNewPassword })

    res.json({ message: 'Contraseña cambiada exitosamente.' })
  } catch (err: any) {
    res.status(500).json({ message: 'Error cambiando la contraseña.', error: err })
  }
}

export const getAll = async (_req: Request, res: Response) => {
  try {
    const users: User[] = await getAllUsers()
    res.json({ data: users })
  } catch (error) {
    res.status(500).json({ message: 'Error consultando todos los usuarios.', error })
  }
}

export const deleteAll = async (_req: Request, res: Response) => {
  try {
    await deleteAllUsers()
    res.json({ message: 'Todos los usuarios han sido eliminados.' })
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando todos los usuarios.', error })
  }
}
