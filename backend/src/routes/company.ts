import { Router } from 'express'
import { update } from '../controllers/companyController'

const router = Router()

router.post('/update', update)

export default router
