import { Router } from 'express';
import { create, getAll } from '../controllers/userController';

const router = Router();

router.post('/create', create);
router.get('/getAll', getAll);

export default router;