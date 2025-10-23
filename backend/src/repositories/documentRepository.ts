import prisma from '../config/prisma'

export const documentRepository = {
  // Crear uno o varios documentos asociados a un CreditApplication
  addToCreditApplication: async (
    creditId: string,
    uploadedById: string,
    companyId: string,
    documents: {
      name: string
      type: string
      url: string
      mimeType: string
      sizeMB: number
    }[]
  ) => {
    const createdDocuments = await prisma.document.createMany({
      data: documents.map(doc => ({
        ...doc,
        creditId,
        uploadedById,
        companyId
      })),
      skipDuplicates: true
    })
    return createdDocuments
  },

  // Opcional: listar documentos de un CreditApplication
  getByCreditApplicationId: async (creditId: string) => {
    return prisma.document.findMany({
      where: { creditId },
      orderBy: { createdAt: 'desc' }
    })
  }
}
