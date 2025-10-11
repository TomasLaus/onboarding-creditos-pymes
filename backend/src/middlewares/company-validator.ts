import { body } from 'express-validator'

export const updateCompanyValidator = [
  body('id').notEmpty().withMessage('El ID de la empresa es requerido.').bail(),
  body('altEmail')
    .optional({ nullable: true, checkFalsy: true }) // hace que sea opcional
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('El email alternativo no es válido.')
]
