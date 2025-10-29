import { Router } from 'express'
import { create, getAll, deleteAll, activate, changePassword, deleteByEmail } from '../controllers/userController'
import { createUserValidator } from '../middlewares/user-validator'
import { validate } from '../middlewares/validatorRequest'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.post('/create', createUserValidator, validate, create)
router.get('/getAll', getAll)
router.get('/deleteAll', deleteAll)
router.get('/deleteByEmail/:email', deleteByEmail)
router.get('/activate', activate)
router.post('/changePassword', authMiddleware, changePassword)

export default router
