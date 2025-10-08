export const userSwagger = {
  paths: {
    '/users/create': {
      post: {
        summary: 'Crear un nuevo usuario con empresa asociada',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: {
                    type: 'string',
                    description: 'Debe tener al menos 6 caracteres, una letra, un número y un carácter especial'
                  },
                  twoFactorSecret: {
                    type: 'string',
                    description: 'Opcional, secreto para 2FA'
                  },
                  legalName: { type: 'string', description: 'Nombre legal de la empresa' },
                  taxId: { type: 'string', description: 'RUC/NIT/CUIT/RUT del contribuyente' },
                  phone: { type: 'string', description: 'Teléfono de la empresa' }
                },
                required: ['email', 'password', 'legalName', 'taxId', 'phone']
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Usuario creado exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Usuario creado exitosamente.' },
                    data: {
                      type: 'object',
                      properties: {
                        email: { type: 'string', format: 'email', example: 'test@example.com' },
                        legalName: { type: 'string', example: 'Mi Empresa' },
                        taxId: { type: 'string', example: '123456789' },
                        phone: { type: 'string', example: '+541112345678' }
                      }
                    }
                  }
                }
              }
            }
          },

          400: {
            description: 'Error de validación',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Todos los campos son requeridos.'
                    }
                  }
                }
              }
            }
          },

          409: {
            description: 'Email o empresa ya existe',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example:
                        'ese usuario ya existe. verificar email. | esa empresa ya existe. verificar RUC/NIT/CUIT/RUT.'
                    }
                  }
                }
              }
            }
          },
          500: {
            description: 'Error interno al crear el usuario',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Error creando usuario.' },
                    error: { type: 'object' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/users/activate': {
      get: {
        summary: 'Activar cuenta de usuario',
        parameters: [
          { name: 'token', in: 'query', required: true, schema: { type: 'string' } },
          { name: 'email', in: 'query', required: true, schema: { type: 'string', format: 'email' } }
        ],
        responses: {
          200: {
            description: 'Cuenta activada correctamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Cuenta activada correctamente. Ya puedes iniciar sesión.' }
                  }
                }
              }
            }
          },
          400: {
            description: 'Error de validación del token o email',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { message: { type: 'string', example: 'Token inválido' } } }
              }
            }
          },
          404: {
            description: 'Usuario no encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Usuario no encontrado' } }
                }
              }
            }
          },
          500: {
            description: 'Error interno al activar usuario',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Error interno' }, error: { type: 'object' } }
                }
              }
            }
          }
        }
      }
    },
    '/users/getAll': {
      get: {
        summary: 'Obtener todos los usuarios',
        responses: {
          200: {
            description: 'Lista de usuarios',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'array', items: { $ref: '#/components/schemas/User' } }
                  }
                }
              }
            }
          },
          500: {
            description: 'Error interno al obtener usuarios',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Error consultando todos los usuarios.' },
                    error: { type: 'object' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'ckl9z1abc0000xyz' },
          email: { type: 'string', format: 'email', example: 'test@example.com' },
          password: { type: 'string', example: '$2b$10$hashedPassword' },
          role: { type: 'string', example: 'CLIENT' },
          isActive: { type: 'boolean', example: false },
          twoFactorSecret: { type: 'string', nullable: true, example: 'abc123' },
          loginAttempts: { type: 'integer', example: 0 },
          lockedUntil: { type: 'string', format: 'date-time', nullable: true, example: '2025-10-06T23:00:00Z' },
          activationToken: { type: 'string', nullable: true },
          tokenExpiresAt: { type: 'string', nullable: true },
          createdAt: { type: 'string', format: 'date-time', example: '2025-10-06T20:00:00Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2025-10-06T20:30:00Z' },
          company: { $ref: '#/components/schemas/Company', nullable: true },
          uploadedDocuments: {
            type: 'array',
            items: { $ref: '#/components/schemas/Document' }
          },
          auditLogs: {
            type: 'array',
            items: { $ref: '#/components/schemas/AuditLog' }
          },
          reviewedOnboardings: {
            type: 'array',
            items: { $ref: '#/components/schemas/Onboarding' }
          },
          assignedCredits: {
            type: 'array',
            items: { $ref: '#/components/schemas/CreditApplication' }
          }
        }
      },
      Company: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'comp123' },
          legalName: { type: 'string', example: 'Mi Empresa' },
          taxId: { type: 'string', example: '123456789' },
          phone: { type: 'string', example: '+541112345678' },
          address: { type: 'string', nullable: true, example: 'Calle Falsa 123' },
          altEmail: { type: 'string', nullable: true, format: 'email', example: 'alt@example.com' },
          userId: { type: 'string', example: 'ckl9z1abc0000xyz' },
          onboarding: { $ref: '#/components/schemas/Onboarding', nullable: true },
          applications: {
            type: 'array',
            items: { $ref: '#/components/schemas/CreditApplication' }
          },
          documents: {
            type: 'array',
            items: { $ref: '#/components/schemas/Document' }
          },
          createdAt: { type: 'string', format: 'date-time', example: '2025-10-06T20:00:00Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2025-10-06T20:30:00Z' }
        }
      },
      // Ejemplos de schemas relacionados
      Document: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'doc123' },
          name: { type: 'string', example: 'documento.pdf' },
          createdAt: { type: 'string', format: 'date-time', example: '2025-10-06T20:15:00Z' }
        }
      },
      AuditLog: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'log123' },
          action: { type: 'string', example: 'CREATED_USER' },
          createdAt: { type: 'string', format: 'date-time', example: '2025-10-06T20:20:00Z' }
        }
      },
      Onboarding: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'onb123' },
          status: { type: 'string', example: 'APPROVED' }
        }
      },
      CreditApplication: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'cred123' },
          status: { type: 'string', example: 'PENDING' }
        }
      }
    }
  }
}
