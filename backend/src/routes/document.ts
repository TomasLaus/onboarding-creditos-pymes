import { Router } from 'express'
import { addToCreditApplication, listByCreditApplication } from '../controllers/documentController'
import { upload } from '../middlewares/multer'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

// Agregar documentos a un CreditApplication existente
// maximo 10 archivos
router.post('/', authMiddleware, upload.array('files', 10), addToCreditApplication)

// Listar documentos de un CreditApplication
router.get('/creditApplication/:creditId', authMiddleware, listByCreditApplication)

export default router
