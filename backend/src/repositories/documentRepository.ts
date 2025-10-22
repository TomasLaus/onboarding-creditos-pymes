import prisma from '../config/prisma'

export const documentRepository = {
  // Crear documento
  async createDocument(data: {
    name: string
    type: string
    url: string
    mimeType: string
    sizeMB: number
    uploadedById: string
    companyId?: string
    onboardingId?: string
    creditId?: string
  }) {
    return await prisma.document.create({
      data: {
        name: data.name,
        type: data.type,
        url: data.url,
        mimeType: data.mimeType,
        sizeMB: data.sizeMB,
        uploadedById: data.uploadedById,
        companyId: data.companyId,
        onboardingId: data.onboardingId,
        creditId: data.creditId
      },
      include: {
        uploadedBy: true,
        company: true,
        onboarding: true,
        credit: true
      }
    })
  },

  // Obtener documento por ID
  async getDocumentById(id: string) {
    return await prisma.document.findUnique({
      where: { id },
      include: {
        uploadedBy: true,
        company: true,
        onboarding: true,
        credit: true
      }
    })
  },

  // Listar todos los documentos
  async listDocuments() {
    return await prisma.document.findMany({
      include: {
        uploadedBy: true,
        company: true,
        onboarding: true,
        credit: true
      },
      orderBy: { createdAt: 'desc' }
    })
  },

  // Obtener documentos por empresa
  async getDocumentsByCompany(companyId: string) {
    return await prisma.document.findMany({
      where: { companyId },
      include: { uploadedBy: true },
      orderBy: { createdAt: 'desc' }
    })
  },

  // Obtener documentos por solicitud de crédito
  async getDocumentsByCredit(creditId: string) {
    return await prisma.document.findMany({
      where: { creditId },
      include: { uploadedBy: true },
      orderBy: { createdAt: 'desc' }
    })
  },

  // Obtener documentos por Onboarding
  async getDocumentsByOnboarding(onboardingId: string) {
    return await prisma.document.findMany({
      where: { onboardingId },
      include: { uploadedBy: true },
      orderBy: { createdAt: 'desc' }
    })
  },

  // Actualizar estado o motivo de observación
  async updateDocumentStatus(id: string, status: string, observedReason?: string) {
    return await prisma.document.update({
      where: { id },
      data: { status, observedReason },
      include: { uploadedBy: true }
    })
  }
}
