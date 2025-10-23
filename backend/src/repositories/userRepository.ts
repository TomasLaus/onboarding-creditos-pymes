import prisma from '../config/prisma'
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

export const getCompanyByUserEmail = async (email: string): Promise<any | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { company: true }
  })
  return user?.company || null
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

export const deleteAllUsers = async (): Promise<any> => {
  await prisma.creditApplication.deleteMany()
  await prisma.company.deleteMany()
  return prisma.user.deleteMany()
}
