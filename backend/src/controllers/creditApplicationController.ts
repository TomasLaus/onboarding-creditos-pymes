import { Request, Response } from 'express'
import { creditApplicationRepository } from '../repositories/CreditApplicationRepository'

export const createCreditApplication = async (req: Request, res: Response) => {
  try {
    const { companyId, amount, termMonths, assignedToId, product, coin, monthlySales, tipoDni, dni, fullname } =
      req.body

    if (!companyId) {
      return res.status(400).json({ message: 'companyId es obligatorio' })
    }

    const creditApp = await creditApplicationRepository.createCreditApplication({
      companyId,
      amount,
      termMonths,
      assignedToId,
      product,
      coin,
      monthlySales,
      tipoDni,
      dni,
      fullname
    })

    return res.status(201).json(creditApp)
  } catch (error) {
    console.error('Error creando credit application:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const getCreditApplicationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const creditApp = await creditApplicationRepository.getCreditApplicationById(id)
    if (!creditApp) {
      return res.status(404).json({ message: 'Solicitud no encontrada' })
    }

    return res.status(200).json(creditApp)
  } catch (error) {
    console.error('Error obteniendo credit application:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const listCreditApplications = async (_req: Request, res: Response) => {
  try {
    const creditApps = await creditApplicationRepository.listCreditApplications()
    return res.status(200).json(creditApps)
  } catch (error) {
    console.error('Error listando credit applications:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const getCreditApplicationsByCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params

    if (!companyId) {
      return res.status(400).json({ message: 'companyId es obligatorio' })
    }

    const apps = await creditApplicationRepository.getCreditApplicationsByCompany(companyId)

    return res.status(200).json(apps)
  } catch (error) {
    console.error('Error obteniendo credit applications por empresa:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}
