import { Router } from 'express'
import { create, getAll, deleteAll, activate } from '../controllers/userController'
import { createUserValidator } from '../middlewares/user-validator'
import { validate } from '../middlewares/validatorRequest'

const router = Router()

router.post('/create', createUserValidator, validate, create)
router.get('/getAll', getAll)
router.get('/deleteAll', deleteAll)
router.get('/activate', activate)

export default router
