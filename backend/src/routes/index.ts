import { Router } from 'express';
import authRoutes from './auth';
import loginRoutes from './login';

const router = Router();

router.use('/auth', authRoutes);
router.use('/login', loginRoutes);

// más rutas: /companies, /loans, /admin...
export default router;
