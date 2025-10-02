import { Router } from 'express';
import { create, getAll } from '../controllers/userController';
import { createUserValidator } from '../middlewares/user-validator';
import { validate } from '../middlewares/validatorRequest';

const router = Router();

router.post('/create', createUserValidator, validate, create);
router.get('/getAll', getAll);

export default router;