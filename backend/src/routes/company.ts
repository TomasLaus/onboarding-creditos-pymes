import { Router } from 'express'
import { update } from '../controllers/companyController'
import { updateCompanyValidator } from '../middlewares/company-validator'
import { validate } from '../middlewares/validatorRequest'

const router = Router()

router.put('/update', updateCompanyValidator, validate, update)

export default router
