import prisma from '../config/config';
import { User } from '../models/user';

export const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
    return prisma.user.create({ data });
};

// Obtener todos los usuarios
export const getAllUsers = async (): Promise<User[]> => {
    return prisma.user.findMany();
};