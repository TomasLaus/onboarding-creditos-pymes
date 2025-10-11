// import { Request, Response } from 'express'

// export const login = async (req: Request, res: Response) => {
//   res.status(200).json({ message: 'hola mundo' })
// }

import { Request, Response } from 'express';
import { login as loginRepo, verifyUser } from '../repositories/loginRepository';
import jwt from 'jsonwebtoken';
import { LoginDTO, LoginResponseDTO } from '../dto/loginDTO';

type JwtPayload = {
  userId: string;
  email: string;
};

/**
 * @description Controlador para autenticación de usuarios
 * @route POST /api/auth/login
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<Response>} Token de acceso
 * @throws {UnauthorizedError} Credenciales inválidas
 */
export const login = async (req: Request, res: Response) => {
  try {
    const loginData: LoginDTO = req.body;
    const result: LoginResponseDTO = await loginRepo(loginData);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: 'Error en login', error: error.message });
  }
};

/**
 * Health check endpoint
 * @route GET /api/health
 */
export const healthCheck = async (req: Request, res: Response) => {
  res.json({ status: 'OK', time: new Date().toISOString(), message: 'El servidor esta corriendo' });
};

 