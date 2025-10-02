import { Request, Response } from 'express';
import { createUser, getAllUsers } from '../repositories/userRepository';

export const create = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await createUser({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

export const getAll = async (_req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};