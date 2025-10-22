import { Request, Response } from 'express'
import { documentRepository } from '../repositories/documentRepository'

export const createDocument = async (req: Request, res: Response) => {
  try {
    const { name, type, url, mimeType, sizeMB, uploadedById, companyId, onboardingId, creditId } = req.body

    if (!name || !type || !url || !mimeType || !sizeMB || !uploadedById) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }

    const document = await documentRepository.createDocument({
      name,
      type,
      url,
      mimeType,
      sizeMB,
      uploadedById,
      companyId,
      onboardingId,
      creditId
    })

    return res.status(201).json(document)
  } catch (error) {
    console.error('Error creando documento:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const doc = await documentRepository.getDocumentById(id)
    if (!doc) return res.status(404).json({ message: 'Documento no encontrado' })
    return res.status(200).json(doc)
  } catch (error) {
    console.error('Error obteniendo documento:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const listDocuments = async (_req: Request, res: Response) => {
  try {
    const docs = await documentRepository.listDocuments()
    return res.status(200).json(docs)
  } catch (error) {
    console.error('Error listando documentos:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const getDocumentsByCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params
    const docs = await documentRepository.getDocumentsByCompany(companyId)
    return res.status(200).json(docs)
  } catch (error) {
    console.error('Error obteniendo documentos por empresa:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const getDocumentsByCredit = async (req: Request, res: Response) => {
  try {
    const { creditId } = req.params
    const docs = await documentRepository.getDocumentsByCredit(creditId)
    return res.status(200).json(docs)
  } catch (error) {
    console.error('Error obteniendo documentos por crédito:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const getDocumentsByOnboarding = async (req: Request, res: Response) => {
  try {
    const { onboardingId } = req.params
    const docs = await documentRepository.getDocumentsByOnboarding(onboardingId)
    return res.status(200).json(docs)
  } catch (error) {
    console.error('Error obteniendo documentos por onboarding:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const updateDocumentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status, observedReason } = req.body

    const updated = await documentRepository.updateDocumentStatus(id, status, observedReason)
    return res.status(200).json(updated)
  } catch (error) {
    console.error('Error actualizando estado del documento:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}
