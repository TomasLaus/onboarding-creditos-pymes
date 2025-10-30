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
  await prisma.document.deleteMany()
  await prisma.creditApplication.deleteMany()
  await prisma.company.deleteMany()
  return prisma.user.deleteMany()
}

export const deleteUserByEmail = async (email: string): Promise<any> => {
  const user = await getUserByEmail(email)
  if (!user) return null

  // 1️⃣ Obtener las compañías del usuario
  const companies = await prisma.company.findMany({
    where: { userId: user.id },
    select: { id: true }
  })
  const companyIds = companies.map(c => c.id)

  // 2️⃣ Obtener las solicitudes de crédito de esas compañías
  const creditApplications = await prisma.creditApplication.findMany({
    where: { companyId: { in: companyIds } },
    select: { id: true }
  })
  const creditIds = creditApplications.map(c => c.id)

  // 3️⃣ Borrar documentos relacionados (subidos por el usuario o vinculados a sus compañías/créditos)
  await prisma.document.deleteMany({
    where: {
      OR: [{ uploadedById: user.id }, { companyId: { in: companyIds } }, { creditId: { in: creditIds } }]
    }
  })

  // 4️⃣ Borrar solicitudes de crédito de las compañías del usuario
  await prisma.creditApplication.deleteMany({
    where: { companyId: { in: companyIds } }
  })

  // 5️⃣ Borrar compañías del usuario
  await prisma.company.deleteMany({
    where: { userId: user.id }
  })

  // 6️⃣ Finalmente borrar el usuario
  return prisma.user.delete({
    where: { id: user.id }
  })
}
