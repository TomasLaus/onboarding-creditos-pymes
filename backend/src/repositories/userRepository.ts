import prisma from '../config/config'
//import { User } from '../models/user';
import { User } from '@prisma/client'

export const createUser = async (data: User): Promise<any> => {
  return prisma.user.create({ data })
}

export const activateUser = async (id: string): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data: { isActive: true }
  })
}

export const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } })
}

export const updateUser = async (id: string, data: Partial<User>): Promise<User | null> => {
  return prisma.user.update({
    where: { id },
    data
  })
}

// Obtener todos los usuarios
export const getAllUsers = async (): Promise<any[]> => {
  return prisma.user.findMany()
}

export const getUserByEmail = async (email: string): Promise<any | null> => {
  return await prisma.user.findUnique({
    where: { email }
  })
}
