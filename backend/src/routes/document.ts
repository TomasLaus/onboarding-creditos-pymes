import { Router } from 'express'
import { addToCreditApplication, listByCreditApplication } from '../controllers/documentController'
import { upload } from '../middlewares/multer'

const router = Router()

// Agregar documentos a un CreditApplication existente
// maximo 10 archivos
router.post('/', upload.array('files', 10), addToCreditApplication)

// Listar documentos de un CreditApplication
router.get('/creditApplication/:creditId', listByCreditApplication)

export default router
