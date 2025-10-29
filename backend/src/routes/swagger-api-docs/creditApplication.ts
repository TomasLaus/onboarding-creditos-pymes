export const creditApplicationSwagger = {
  paths: {
    '/credit-applications': {
      post: {
        summary: 'Crear una nueva solicitud de crédito',
        tags: ['credditApplication'],
        description:
          'Crea una nueva solicitud de crédito asociada a una empresa. Requiere el ID de la empresa y los datos de la solicitud.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  companyId: { type: 'string', example: 'comp_12345' },
                  amount: { type: 'number', example: 500000 },
                  termMonths: { type: 'number', example: 12 },
                  assignedToId: { type: 'string', nullable: true, example: 'usr_78910' },
                  product: { type: 'string', example: 'Crédito Pyme Express' },
                  coin: { type: 'string', example: 'ARS' },
                  monthlySales: { type: 'number', example: 1200000 },
                  tipoDni: { type: 'string', example: 'DNI' },
                  dni: { type: 'string', example: '34567890' },
                  fullname: { type: 'string', example: 'Juan Pérez' }
                },
                required: ['companyId']
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Solicitud creada correctamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    id: 'cred_12345',
                    companyId: 'comp_12345',
                    amount: 500000,
                    termMonths: 12,
                    assignedToId: 'usr_78910',
                    product: 'Crédito Pyme Express',
                    coin: 'ARS',
                    monthlySales: 1200000,
                    tipoDni: 'DNI',
                    dni: '34567890',
                    fullname: 'Juan Pérez',
                    createdAt: '2025-10-27T20:00:00Z',
                    updatedAt: '2025-10-27T20:00:00Z'
                  }
                }
              }
            }
          },
          400: {
            description: 'Falta companyId u otro dato obligatorio',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'companyId es obligatorio' }
                  }
                }
              }
            }
          },
          500: {
            description: 'Error interno del servidor',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Error interno del servidor' }
                  }
                }
              }
            }
          }
        }
      },

      get: {
        summary: 'Listar solicitudes de crédito',
        tags: ['credditApplication'],
        description: 'Lista todas las solicitudes de crédito (actualmente no implementado).',
        responses: {
          501: {
            description: 'Funcionalidad no implementada',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Funcionalidad no implementada.' }
                  }
                }
              }
            }
          }
        }
      }
    },

    '/credit-applications/{id}': {
      get: {
        summary: 'Obtener una solicitud de crédito por ID',
        tags: ['credditApplication'],
        description: 'Devuelve los datos de una solicitud de crédito según su ID.',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'ID de la solicitud de crédito',
            example: 'cred_12345'
          }
        ],
        responses: {
          200: {
            description: 'Solicitud encontrada',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    id: 'cred_12345',
                    companyId: 'comp_12345',
                    amount: 500000,
                    termMonths: 12,
                    assignedToId: 'usr_78910',
                    product: 'Crédito Pyme Express',
                    coin: 'ARS',
                    monthlySales: 1200000,
                    tipoDni: 'DNI',
                    dni: '34567890',
                    fullname: 'Juan Pérez',
                    createdAt: '2025-10-27T20:00:00Z',
                    updatedAt: '2025-10-27T20:00:00Z'
                  }
                }
              }
            }
          },
          404: {
            description: 'Solicitud no encontrada',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Solicitud no encontrada' } }
                }
              }
            }
          },
          500: {
            description: 'Error interno del servidor',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Error interno del servidor' } }
                }
              }
            }
          }
        }
      },

      put: {
        summary: 'Actualizar una solicitud de crédito',
        tags: ['credditApplication'],
        description: 'Actualiza los datos de una solicitud existente según su ID.',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'ID de la solicitud de crédito',
            example: 'cred_12345'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  companyId: { type: 'string', example: 'comp_12345' },
                  amount: { type: 'number', example: 750000 },
                  termMonths: { type: 'number', example: 18 },
                  assignedToId: { type: 'string', example: 'usr_78910' },
                  product: { type: 'string', example: 'Crédito Pyme Plus' },
                  coin: { type: 'string', example: 'USD' },
                  monthlySales: { type: 'number', example: 1500000 },
                  tipoDni: { type: 'string', example: 'CUIT' },
                  dni: { type: 'string', example: '20-34567890-1' },
                  fullname: { type: 'string', example: 'Juan Pérez' }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Solicitud actualizada correctamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    id: 'cred_12345',
                    companyId: 'comp_12345',
                    amount: 750000,
                    termMonths: 18,
                    assignedToId: 'usr_78910',
                    product: 'Crédito Pyme Plus',
                    coin: 'USD',
                    monthlySales: 1500000,
                    tipoDni: 'CUIT',
                    dni: '20-34567890-1',
                    fullname: 'Juan Pérez',
                    createdAt: '2025-10-27T20:00:00Z',
                    updatedAt: '2025-10-28T09:00:00Z'
                  }
                }
              }
            }
          },
          500: {
            description: 'Error interno del servidor',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Error interno del servidor' } }
                }
              }
            }
          }
        }
      }
    },

    '/credit-applications/company/{companyId}': {
      get: {
        summary: 'Listar solicitudes de crédito por empresa',
        tags: ['credditApplication'],
        description: 'Obtiene todas las solicitudes de crédito asociadas a una empresa específica.',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'companyId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'ID de la empresa',
            example: 'comp_12345'
          }
        ],
        responses: {
          200: {
            description: 'Solicitudes encontradas para la empresa',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    example: {
                      id: 'cred_12345',
                      companyId: 'comp_12345',
                      amount: 500000,
                      termMonths: 12,
                      assignedToId: 'usr_78910',
                      product: 'Crédito Pyme Express',
                      coin: 'ARS',
                      monthlySales: 1200000,
                      tipoDni: 'DNI',
                      dni: '34567890',
                      fullname: 'Juan Pérez',
                      createdAt: '2025-10-27T20:00:00Z',
                      updatedAt: '2025-10-27T20:00:00Z'
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Falta companyId en la URL',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'companyId es obligatorio' } }
                }
              }
            }
          },
          500: {
            description: 'Error interno del servidor',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Error interno del servidor' } }
                }
              }
            }
          }
        }
      }
    }
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
}
