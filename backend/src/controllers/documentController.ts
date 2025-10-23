import { Request, Response } from 'express'
import { documentRepository } from '../repositories/documentRepository'

export const addToCreditApplication = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[]
    const { creditId, uploadedById, companyId } = req.body

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'Debe enviar al menos un archivo' })
    }

    // Mapear archivos a la estructura esperada por el repository
    const documents = files.map(file => ({
      name: file.originalname,
      type: file.mimetype.split('/')[1].toUpperCase(), // ej: 'PDF' o 'PNG'
      url: `/uploads/${file.filename}`,
      mimeType: file.mimetype,
      sizeMB: file.size / (1024 * 1024)
    }))

    const createdDocs = await documentRepository.addToCreditApplication(creditId, uploadedById, companyId, documents)

    res.status(201).json({ message: 'Documentos agregados', created: createdDocs })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al agregar documentos' })
  }
}

export const listByCreditApplication = async (req: Request, res: Response) => {
  try {
    const { creditId } = req.params
    const docs = await documentRepository.getByCreditApplicationId(creditId)
    res.status(200).json(docs)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al listar documentos' })
  }
}
