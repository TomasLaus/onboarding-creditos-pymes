import { Router } from 'express'
import { create, getAll, activate } from '../controllers/userController'
import { createUserValidator } from '../middlewares/user-validator'
import { validate } from '../middlewares/validatorRequest'

const router = Router()

router.post('/create', createUserValidator, validate, create)
router.get('/getAll', getAll)
router.get('/activate', activate)

export default router
