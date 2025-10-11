import request from 'supertest'
import app from '../../app'
import prisma from '../../config/config'

describe('User Controller', () => {
  beforeEach(async () => {
    await prisma.company.deleteMany({}) // elimina todas las empresas
    await prisma.user.deleteMany({}) // elimina todos los usuarios
  })

  describe('POST /api/users/create', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'pAssword123-',
        twoFactorSecret: 'secret123',
        legalName: 'Test Company',
        taxId: '20-22486722-1',
        phone: '+1234567890'
      }

      const response = await request(app).post('/api/users/create').send(userData)

      expect(response.status).toBe(201)
      expect(response.body.message).toBe('Usuario creado exitosamente.')
      expect(response.body.data.email).toBe(userData.email)
      expect(response.body.data.legalName).toBe(userData.legalName)
      expect(response.body.data.taxId).toBe(userData.taxId)
      expect(response.body.data.phone).toBe(userData.phone)
    })

    it('should return an error if any required field is missing', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'pAssword123-'
      }

      const response = await request(app).post('/api/users/create').send(userData)

      expect(response.status).toBe(400)
      expect(response.body.message).toBe('Todos los campos son requeridos.')
    })

    it('should return an error if the RUC/NIT/CUIT/RUT is invalid', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'pAssword123-',
        twoFactorSecret: 'secret123',
        activationToken: 'token123',
        tokenExpiresAt: String(new Date()),
        legalName: 'Test Company',
        taxId: '12345678',
        phone: '+1234567890'
      }

      const response = await request(app).post('/api/users/create').send(userData)
      expect(response.status).toBe(400)
      expect(response.body.message).toBe('El RUC/NIT/CUIT/RUT de contribuyente no es válido.')
    })

    it('should return an error if the user already exists', async () => {
      const existingUser = {
        email: 'test@example.com',
        password: 'pAssword123-',
        twoFactorSecret: 'secret123',
        activationToken: 'token123',
        tokenExpiresAt: String(new Date()),
        legalName: 'Test Company',
        taxId: '20-22486722-1',
        phone: '+1234567890'
      }

      // Create the existing user
      await request(app).post('/api/users/create').send(existingUser)

      const userData = {
        email: 'test@example.com',
        password: 'pAssword123-',
        twoFactorSecret: 'secret123',
        activationToken: 'token123',
        tokenExpiresAt: String(new Date()),
        legalName: 'Test Company',
        taxId: '20-22486722-1',
        phone: '+1234567890'
      }
      const response = await request(app).post('/api/users/create').send(userData)

      expect(response.status).toBe(409)
      expect(response.body.message).toBe('ese usuario ya existe. verificar email.')
    })
  })
})
