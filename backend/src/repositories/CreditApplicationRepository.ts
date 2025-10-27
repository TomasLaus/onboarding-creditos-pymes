import prisma from '../config/prisma'

export const creditApplicationRepository = {
  async createCreditApplication(data: {
    companyId: string
    amount: number
    termMonths: number
    assignedToId?: string
    product: string
    coin: string
    monthlySales: number
    tipoDni: string
    dni: string
    fullname: string
  }) {
    return await prisma.creditApplication.create({
      data: {
        companyId: data.companyId,
        amount: data.amount,
        termMonths: data.termMonths,
        assignedToId: data.assignedToId,
        product: data.product,
        coin: data.coin,
        monthlySales: data.monthlySales,
        tipoDni: data.tipoDni,
        dni: data.dni,
        fullname: data.fullname
      },
      include: {
        company: true,
        assignedTo: true
      }
    })
  },

  async getCreditApplicationById(id: string) {
    return await prisma.creditApplication.findUnique({
      where: { id },
      include: {
        company: true,
        assignedTo: true
      }
    })
  },

  async listCreditApplications() {
    return await prisma.creditApplication.findMany({
      include: {
        company: true,
        assignedTo: true
      },
      orderBy: { createdAt: 'desc' }
    })
  },

  async getCreditApplicationsByCompany(companyId: string) {
    return await prisma.creditApplication.findMany({
      where: { companyId },
      include: {
        company: true,
        assignedTo: true
      },
      orderBy: { createdAt: 'desc' }
    })
  },

  async updateCreditApplication(
    id: string,
    data: Partial<{
      companyId: string
      amount: number
      termMonths: number
      assignedToId?: string
      product: string
      coin: string
      monthlySales: number
      tipoDni: string
      dni: string
      fullname: string
    }>
  ) {
    return await prisma.creditApplication.update({
      where: { id },
      data: {
        ...data
      },
      include: {
        company: true,
        assignedTo: true
      }
    })
  }
}
