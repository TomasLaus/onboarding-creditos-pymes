export const userSwagger = {
  paths: {
    '/users/create': {
      post: {
        summary: 'Crear un nuevo usuario',
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
                    description:
                      'Debe tener al menos 6 caracteres, una letra, un número y un carácter especial'
                  },
                  twoFactorSecret: {
                    type: 'string',
                    description: 'Opcional, secreto para 2FA'
                  }
                },
                required: ['email', 'password']
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
                    message: {
                      type: 'string',
                      example: 'Usuario creado exitosamente.'
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'ckl9z1abc0000xyz' },
                        email: {
                          type: 'string',
                          format: 'email',
                          example: 'test@example.com'
                        },
                        role: { type: 'string', example: 'CLIENT' },
                        isActive: { type: 'boolean', example: false }
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
            description: 'El email ya existe',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'ese usuario ya existe. verificar email.'
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
                    message: {
                      type: 'string',
                      example: 'Error creando usuario.'
                    },
                    error: { type: 'object' }
                  }
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
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/User' }
                    }
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
                    message: {
                      type: 'string',
                      example: 'Error consultando todos los usuarios.'
                    },
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
          email: {
            type: 'string',
            format: 'email',
            example: 'test@example.com'
          },
          password: { type: 'string', example: '$2b$10$hashedPassword' },
          role: { type: 'string', example: 'CLIENT' },
          isActive: { type: 'boolean', example: false },
          twoFactorSecret: { type: 'string', example: 'abc123' },
          loginAttempts: { type: 'integer', example: 0 },
          lockedUntil: {
            type: 'string',
            format: 'date-time',
            example: '2025-10-06T23:00:00Z'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-10-06T20:00:00Z'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-10-06T20:30:00Z'
          },

          // Relaciones (opcional, pueden ser arrays o objetos vacíos si no existen)
          company: {
            type: 'object',
            nullable: true,
            description: 'Empresa asociada al usuario (si es CLIENT)',
            properties: {
              id: { type: 'string', example: 'comp123' },
              name: { type: 'string', example: 'Mi Empresa' }
            }
          },
          uploadedDocuments: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'doc123' },
                name: { type: 'string', example: 'documento.pdf' },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-10-06T20:15:00Z'
                }
              }
            }
          },
          auditLogs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'log123' },
                action: { type: 'string', example: 'CREATED_USER' },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-10-06T20:20:00Z'
                }
              }
            }
          },
          reviewedOnboardings: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'onb123' },
                status: { type: 'string', example: 'APPROVED' }
              }
            }
          },
          assignedCredits: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'cred123' },
                status: { type: 'string', example: 'PENDING' }
              }
            }
          }
        }
      }
    }
  }
}
