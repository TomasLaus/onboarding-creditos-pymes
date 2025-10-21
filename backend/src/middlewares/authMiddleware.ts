import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

export default function (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: 'No se proporcionó el token de autorización.',
      error: true
    })
  }

  // separa "Bearer ..." y toma el token
  const token = authHeader.split(' ')[1]
  const decoded = verifyToken(token)

  if (!decoded) {
    return res.status(401).json({
      message: 'Token de autorización inválido.',
      error: true
    })
  }

  // Continúa al siguiente middleware o controlador
  next()
}
