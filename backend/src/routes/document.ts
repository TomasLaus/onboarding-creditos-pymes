import { Router } from 'express'
import {
  createDocument,
  getDocumentById,
  listDocuments,
  getDocumentsByCompany,
  getDocumentsByCredit,
  getDocumentsByOnboarding,
  updateDocumentStatus
} from '../controllers/documentController'

const router = Router()

router.post('/', createDocument)
router.get('/', listDocuments)
router.get('/:id', getDocumentById)
router.get('/company/:companyId', getDocumentsByCompany)
router.get('/credit/:creditId', getDocumentsByCredit)
router.get('/onboarding/:onboardingId', getDocumentsByOnboarding)
router.put('/:id/status', updateDocumentStatus)

export default router
