import prisma from '../config/prisma'
//import { User } from '../models/user';
import { Company } from '@prisma/client'

export const createCompany = async (data: Company): Promise<any> => {
  return prisma.company.create({ data })
}

export const updateCompany = async (
  id: string,
  data: Partial<Company>
): Promise<Pick<Company, 'phone' | 'altEmail' | 'address'>> => {
  return prisma.company.update({
    where: { id },
    data,
    select: {
      phone: true,
      altEmail: true,
      address: true
    }
  })
}

// Obtener todas las empresas
export const getAllCompanies = async (): Promise<any[]> => {
  return prisma.company.findMany()
}

export const getCompanyById = async (id: string): Promise<any | null> => {
  return await prisma.company.findUnique({
    where: { id }
  })
}

export const getCompanyByTaxId = async (taxId: string): Promise<any | null> => {
  return await prisma.company.findUnique({
    where: { taxId }
  })
}
