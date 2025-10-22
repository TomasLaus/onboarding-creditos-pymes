import { Router } from 'express'
import {
  createCreditApplication,
  getCreditApplicationById,
  listCreditApplications,
  getCreditApplicationsByCompany
} from '../controllers/creditApplicationController'

const router = Router()

router.post('/', createCreditApplication)
router.get('/', listCreditApplications)
router.get('/:id', getCreditApplicationById)
router.get('/company/:companyId', getCreditApplicationsByCompany)

export default router
