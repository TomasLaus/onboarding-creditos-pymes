import { Router } from 'express'
import {
  createCreditApplication,
  getCreditApplicationById,
  listCreditApplications,
  getCreditApplicationsByCompany,
  updateCreditApplication
} from '../controllers/creditApplicationController'

const router = Router()

router.post('/', createCreditApplication)
router.get('/', listCreditApplications)
router.get('/:id', getCreditApplicationById)
router.get('/company/:companyId', getCreditApplicationsByCompany)
router.put('/:id', updateCreditApplication)

export default router
