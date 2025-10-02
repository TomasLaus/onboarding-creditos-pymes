import { Request, Response } from 'express';
import { createUser, getAllUsers } from '../repositories/userRepository';

export const create = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await createUser({ name, email, password });
        res.status(201).json({ user, message: "Usuario creado exitosamente." });
    } catch (error) {
        res.status(500).json({ message: 'Error creando usuario.', error });
    }
};

export const getAll = async (_req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error consultando todos los usuarios.', error });
    }
};