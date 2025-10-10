import { Router } from 'express'
import { login, verify } from '../controllers/authController'
import { forgotPassword, resetPassword } from '../controllers/authController'

const router = Router()

router.post('/login', login)
router.get('/verify', verify)

router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

export default router
