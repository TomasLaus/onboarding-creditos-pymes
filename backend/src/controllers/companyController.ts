import { CreateCompanyResponseOKDTO, UpdateCompanyDTO } from '../dto/companyDTO'
import { updateCompany, getCompanyById } from '../repositories/companyRepository'
import { Request, Response } from 'express'

export const update = async (req: Request, res: Response) => {
  try {
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
    const updatedCompany: UpdateCompanyDTO = await updateCompany(postBodyData.id, postBodyData)

    const response: CreateCompanyResponseOKDTO = {
      newProps: {
        phone: updatedCompany.phone,
        altEmail: postBodyData.altEmail ? updatedCompany.altEmail : exist.altEmail,
        address: updatedCompany.address
      },
      oldProps: oldCompanyData
    } as CreateCompanyResponseOKDTO

    return res.status(200).json({ message: 'Empresa actualizada correctamente.', data: response })
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor.' })
  }
}
