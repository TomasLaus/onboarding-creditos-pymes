import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import {
  createUser,
  getAllUsers,
  getUserByEmail
} from '../repositories/userRepository'
import {
  CreateUserDTO,
  CreateUserResponseOKDTO,
  CreateUserResponseErrorDTO
} from '../dto/userDTO'
import { User } from '@prisma/client'

export const create = async (req: Request, res: Response) => {
  try {
    const postBodyData: CreateUserDTO = req.body

    if (!postBodyData.password || !postBodyData.email) {
      return res
        .status(400)
        .json({ message: 'Todos los campos son requeridos.' })
    }
    const exist = await getUserByEmail(postBodyData.email)

    if (exist) {
      return res
        .status(409)
        .json({ message: 'ese usuario ya existe. verificar email.' })
    }

    const hashedPassword = await bcrypt.hash(postBodyData.password, 10)
    postBodyData.password = hashedPassword
    const createdUser: User = await createUser(postBodyData as User)
    const responseUser: CreateUserResponseOKDTO = { email: createdUser.email }

    res.status(201).json({
      message: 'Usuario creado exitosamente.',
      data: { email: responseUser.email }
    })
  } catch (err: any) {
    const responseError: CreateUserResponseErrorDTO = {
      message: 'Error creando usuario.',
      error: err
    }
    res.status(500).json(responseError)
  }
}

export const getAll = async (_req: Request, res: Response) => {
  try {
    const users: User[] = await getAllUsers()
    res.json({ data: users })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error consultando todos los usuarios.', error })
  }
}
