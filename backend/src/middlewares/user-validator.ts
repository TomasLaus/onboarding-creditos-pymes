import { body } from 'express-validator'

export const createUserValidator = [
  body('email').notEmpty().withMessage('Email is required').bail().isEmail().withMessage('Invalid email format'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&-])/)
    .withMessage('Password must contain at least one letter, one number, and one special character')
]
