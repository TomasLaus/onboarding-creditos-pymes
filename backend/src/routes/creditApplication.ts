import { Router } from 'express'
import {
  createCreditApplication,
  getCreditApplicationById,
  listCreditApplications,
  getCreditApplicationsByCompany,
  updateCreditApplication
} from '../controllers/creditApplicationController'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.post('/', authMiddleware, createCreditApplication)
router.get('/', listCreditApplications)
router.get('/:id', authMiddleware, getCreditApplicationById)
router.get('/company/:companyId', authMiddleware, getCreditApplicationsByCompany)
router.put('/:id', authMiddleware, updateCreditApplication)

export default router
