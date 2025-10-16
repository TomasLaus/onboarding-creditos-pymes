import { CreateCompanyResponseOKDTO, UpdateCompanyDTO } from '../dto/companyDTO'
import { updateCompany, getCompanyById, getAllCompanies } from '../repositories/companyRepository'
import { Request, Response } from 'express'
import { verifyToken } from '../utils/jwt'

export const update = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ message: 'No se proporcionó el token de autorización.' })
    }
    const token = authHeader.split(' ')[1] // separa "Bearer" y se queda con el token
    const decoded = verifyToken(token)
    if (!decoded) {
      return res.status(401).json({ message: 'Token de autorización inválido.' })
    }

    /////////////////////////////

    const postBodyData: UpdateCompanyDTO = req.body as UpdateCompanyDTO
    if (!postBodyData.id) {
      return res.status(400).json({ message: 'El ID de la empresa es requerido.' })
    }
    const exist = await getCompanyById(postBodyData.id)
    if (!exist) {
      return res.status(404).json({ message: 'Empresa no encontrada.' })
    }

    const oldCompanyData = {
      phone: exist.phone,
      altEmail: exist.altEmail,
      address: exist.address
    }
    const updatedCompany = await updateCompany(postBodyData.id, postBodyData)

    const response = {
      newProps: {
        phone: updatedCompany.phone ?? '',
        altEmail: updatedCompany.altEmail ?? '',
        address: updatedCompany.address ?? ''
      },
      oldProps: oldCompanyData
    } satisfies CreateCompanyResponseOKDTO

    return res.status(200).json({ message: 'Empresa actualizada correctamente.', data: response })
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor.' })
  }
}

export const getAll = async (req: Request, res: Response) => {
  try {
    const companies = await getAllCompanies()
    return res.status(200).json({ message: 'Empresas obtenidas correctamente.', data: companies })
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor.' })
  }
}
