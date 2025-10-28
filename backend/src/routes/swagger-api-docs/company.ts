export const companySwagger = {
  tags: [
    {
      name: 'Company',
      description: 'Operaciones relacionadas con la gestión de empresas'
    }
  ],
  paths: {
    '/company/update': {
      put: {
        tags: ['Company'],
        summary: 'Actualizar una empresa existente',
        description:
          'Permite actualizar los datos de una empresa (teléfono, email alternativo y dirección) identificada por su ID.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'string', description: 'ID de la empresa', example: 'comp123' },
                  phone: { type: 'string', description: 'Teléfono de la empresa', example: '+541112345678' },
                  altEmail: {
                    type: 'string',
                    format: 'email',
                    nullable: true,
                    description: 'Email alternativo',
                    example: 'alt@example.com'
                  },
                  address: {
                    type: 'string',
                    nullable: true,
                    description: 'Dirección de la empresa',
                    example: 'Calle Falsa 123'
                  }
                },
                required: ['id']
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Empresa actualizada correctamente.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Empresa actualizada correctamente.' },
                    data: {
                      type: 'object',
                      properties: {
                        newProps: {
                          type: 'object',
                          properties: {
                            phone: { type: 'string', example: '+541112345678' },
                            altEmail: { type: 'string', example: 'alt@example.com' },
                            address: { type: 'string', example: 'Calle Verdadera 456' }
                          }
                        },
                        oldProps: {
                          type: 'object',
                          properties: {
                            phone: { type: 'string', example: '+541176543210' },
                            altEmail: { type: 'string', example: 'anterior@example.com' },
                            address: { type: 'string', example: 'Calle Falsa 123' }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'El ID de la empresa es requerido.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'El ID de la empresa es requerido.' } }
                }
              }
            }
          },
          404: {
            description: 'Empresa no encontrada.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Empresa no encontrada.' } }
                }
              }
            }
          },
          500: {
            description: 'Error interno del servidor.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Error interno del servidor.' } }
                }
              }
            }
          }
        }
      }
    },

    '/company/all': {
      get: {
        tags: ['Company'],
        summary: 'Obtener todas las empresas',
        description: 'Devuelve una lista con todas las empresas registradas en el sistema.',
        responses: {
          200: {
            description: 'Empresas obtenidas correctamente.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Empresas obtenidas correctamente.' },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string', example: 'comp123' },
                          legalName: { type: 'string', example: 'Mi Empresa SRL' },
                          taxId: { type: 'string', example: '30-12345678-9' },
                          phone: { type: 'string', example: '+541112345678' },
                          altEmail: { type: 'string', example: 'alt@example.com' },
                          address: { type: 'string', example: 'Calle Verdadera 456' },
                          createdAt: { type: 'string', format: 'date-time', example: '2025-10-06T20:00:00Z' },
                          updatedAt: { type: 'string', format: 'date-time', example: '2025-10-06T20:30:00Z' }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          500: {
            description: 'Error interno del servidor.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Error interno del servidor.' } }
                }
              }
            }
          }
        }
      }
    },

    '/company/{id}': {
      get: {
        tags: ['Company'],
        summary: 'Obtener una empresa por ID',
        description: 'Devuelve los datos de una empresa específica identificada por su ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID de la empresa',
            schema: { type: 'string', example: 'comp123' }
          }
        ],
        responses: {
          200: {
            description: 'Empresa obtenida correctamente.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Empresa obtenida correctamente.' },
                    data: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'comp123' },
                        legalName: { type: 'string', example: 'Mi Empresa SRL' },
                        taxId: { type: 'string', example: '30-12345678-9' },
                        phone: { type: 'string', example: '+541112345678' },
                        altEmail: { type: 'string', example: 'alt@example.com' },
                        address: { type: 'string', example: 'Calle Verdadera 456' },
                        createdAt: { type: 'string', format: 'date-time', example: '2025-10-06T20:00:00Z' },
                        updatedAt: { type: 'string', format: 'date-time', example: '2025-10-06T20:30:00Z' }
                      }
                    }
                  }
                }
              }
            }
          },
          404: {
            description: 'Empresa no encontrada.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Empresa no encontrada.' } }
                }
              }
            }
          },
          500: {
            description: 'Error interno del servidor.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Error interno del servidor.' } }
                }
              }
            }
          }
        }
      }
    }
  }
}
