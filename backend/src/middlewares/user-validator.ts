import { body } from 'express-validator';

export const createUserValidator = [
    body('name').isString().not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

