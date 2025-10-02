import { PrismaClient } from '@prisma/client';

const prismaConn = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

export default prismaConn;

