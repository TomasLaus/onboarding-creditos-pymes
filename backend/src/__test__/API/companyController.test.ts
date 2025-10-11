import request from 'supertest'
import app from '../../app'
import prisma from '../../config/config'

describe('Company Controller', () => {
  let companyId: string
  let userId: string

  beforeEach(async () => {
    await prisma.company.deleteMany({}) // elimina todas las empresas
    await prisma.user.deleteMany({}) // elimina todos los usuarios

    const userData = {
      email: 'testd@example.com',
      password: 'pAssword123-',
      twoFactorSecret: 'secret123',
      legalName: 'Test Company',
      taxId: '20-22486722-1',
      phone: '+1234567890'
    }

    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'pAssword123-',
        twoFactorSecret: 'secret123'
      }
    })
    userId = user.id

    const company = await prisma.company.create({
      data: {
        legalName: 'Empresa Test',
        taxId: '20-22486722-1',
        phone: '+1234567890',
        altEmail: 'alt@example.com',
        address: 'Calle Falsa 123',
        userId: userId
      }
    })
    companyId = company.id
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should update a company successfully', async () => {
    const updateData = {
      id: companyId,
      phone: '+0987654321',
      altEmail: 'nuevo@example.com',
      address: 'Nueva Calle 456'
    }

    const response = await request(app).put('/api/company/update').send(updateData)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Empresa actualizada correctamente.')
    expect(response.body.data.oldProps).toEqual({
      phone: '+1234567890',
      altEmail: 'alt@example.com',
      address: 'Calle Falsa 123'
    })
    expect(response.body.data.newProps).toEqual({
      phone: updateData.phone,
      altEmail: updateData.altEmail,
      address: updateData.address
    })
  })

  it('should return 400 if ID is missing', async () => {
    const updateData = {
      phone: '+0987654321'
    }
    const response = await request(app).put('/api/company/update').send(updateData)
    expect(response.status).toBe(400)
    //error viene del middleware validator
    expect(response.body.errors[0].msg).toBe('El ID de la empresa es requerido.')
  })

  it('should return 404 if company does not exist', async () => {
    const updateData = {
      id: 'nonexistent-id',
      altEmail: 'nuevo@example.com',
      phone: '+0987654321'
    }

    const response = await request(app).put('/api/company/update').send(updateData)
    console.log(response.body.errors)

    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Empresa no encontrada.')
  })

  it('should return 500 if something goes wrong internally', async () => {
    jest.spyOn(prisma.company, 'update').mockImplementationOnce(() => {
      throw new Error('DB error')
    })

    const updateData = {
      id: companyId,
      phone: '+0987654321'
    }

    const response = await request(app).put('/api/company/update').send(updateData)
    console.log(response.body)

    expect(response.status).toBe(500)
    expect(response.body.message).toBe('Error interno del servidor.')
  })

  it('should return 400 if altEmail format is invalid', async () => {
    const updateData = {
      id: companyId,
      altEmail: 'invalid-email'
    }
    const response = await request(app).put('/api/company/update').send(updateData)
    expect(response.status).toBe(400)
    expect(response.body.errors[0].msg).toBe('El email alternativo no es válido.')
  })
})
