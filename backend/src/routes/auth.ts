import { Router } from 'express'
import { forgotPassword, resetPassword } from '../controllers/authController'

const router = Router()

router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.get('/renderIsUpdate', (req, res) => {
  res.json({ message: '10.15 am' })
})

export default router
