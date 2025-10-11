// ========================================
// ARCHIVO: seedUser.ts
// Descripción: Script para crear usuario de prueba con Prisma
// Ejecutar con: ts-node seedUser.ts
// ========================================

import 'dotenv/config';
import prisma from './src/config/config';
import bcrypt from 'bcrypt';

const createTestUser = async () => {
  try {
    // Eliminar usuario existente si existe (para permitir recreación)
    const existingUser = await prisma.user.findUnique({
      where: { email: 'empresa1@test.com' }
    });

    if (existingUser) {
      await prisma.user.delete({
        where: { email: 'empresa1@test.com' }
      });
      console.log('🗑️  Usuario existente eliminado');
    }

    // Crear usuario de prueba
    const hashedPassword = await bcrypt.hash('123456', 10);

    const testUser = await prisma.user.create({
      data: {
        //name: 'Empresa Test',
        email: 'empresa1@test.com',
        password: hashedPassword,
        role: 'CLIENT',
        isActive: true, // ¡IMPORTANTE! Debe estar activo
        loginAttempts: 0,
        lockedUntil: null,
        twoFactorSecret: null
      }
    });

    console.log('✅ Usuario de prueba creado:');
    console.log('   Email: empresa1@test.com');
    console.log('   Password: 123456');
    console.log('   Role: PYME');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createTestUser();