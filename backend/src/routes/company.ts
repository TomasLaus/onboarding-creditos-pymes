import { Router } from 'express'
import { getAll, update } from '../controllers/companyController'
import { updateCompanyValidator } from '../middlewares/company-validator'
import { validate } from '../middlewares/validatorRequest'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.put('/update', authMiddleware, updateCompanyValidator, validate, update)
router.get('/getAll', getAll)

export default router
