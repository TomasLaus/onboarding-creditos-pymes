import { Router } from 'express'
import { login, healthCheck } from '../controllers/authLoginController'

const router = Router()

router.post('/', login)
router.get('/health', healthCheck)


export default router