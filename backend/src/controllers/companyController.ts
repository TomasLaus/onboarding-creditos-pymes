import { CreateCompanyResponseOKDTO, UpdateCompanyDTO } from '../dto/companyDTO'
import { updateCompany } from '../repositories/companyRepository'
import { Request, Response } from 'express'

export const update = async (req: Request, res: Response) => {
  try {
    const postBodyData: UpdateCompanyDTO = req.body as UpdateCompanyDTO
    if (!postBodyData.id) {
      return res.status(400).json({ message: 'El ID de la empresa es requerido.' })
    }
    const oldCompanyData = {
      phone: postBodyData.phone,
      altEmail: postBodyData.altEmail,
      address: postBodyData.address
    }
    const updatedCompany: UpdateCompanyDTO = await updateCompany(postBodyData.id, postBodyData)

    const response: CreateCompanyResponseOKDTO = {
      newProps: {
        phone: updatedCompany.phone,
        altEmail: updatedCompany.altEmail,
        address: updatedCompany.address
      },
      oldProps: oldCompanyData
    } as CreateCompanyResponseOKDTO

    return res.status(200).json({ message: 'Empresa actualizada correctamente.', data: response })
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor.' })
  }
}
