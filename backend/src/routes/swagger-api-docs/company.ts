export const companySwagger = {
  paths: {
    '/company/update': {
      put: {
        summary: 'Actualizar datos de una empresa existente',
        description:
          'Permite actualizar información de una empresa (teléfono, email alternativo y dirección) identificada por su ID.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateCompanyDTO' }
            }
          }
        },
        responses: {
          200: {
            description: 'Empresa actualizada correctamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Empresa actualizada correctamente.' },
                    data: { $ref: '#/components/schemas/CreateCompanyResponseOKDTO' }
                  }
                }
              }
            }
          },
          400: {
            description: 'Falta el ID de la empresa o body inválido',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          404: {
            description: 'Empresa no encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          500: {
            description: 'Error interno del servidor',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      // DTO que recibe el endpoint
      UpdateCompanyDTO: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID de la empresa a actualizar', example: 'comp123' },
          phone: { type: 'string', description: 'Nuevo teléfono de la empresa', example: '+541112345678' },
          altEmail: { type: 'string', format: 'email', nullable: true, example: 'alt@example.com' },
          address: { type: 'string', nullable: true, example: 'Calle Falsa 123' }
        },
        required: ['id']
      },

      // Props específicas que componen oldProps y newProps
      CompanyUpdateProps: {
        type: 'object',
        properties: {
          phone: { type: 'string', example: '+541112345678' },
          altEmail: { type: 'string', format: 'email', nullable: true, example: 'alt@example.com' },
          address: { type: 'string', nullable: true, example: 'Calle Falsa 123' }
        }
      },

      // DTO de respuesta específico para este controller
      CreateCompanyResponseOKDTO: {
        type: 'object',
        description: 'Objeto con las propiedades antiguas y las nuevas tras la actualización',
        properties: {
          newProps: { $ref: '#/components/schemas/CompanyUpdateProps' },
          oldProps: { $ref: '#/components/schemas/CompanyUpdateProps' }
        }
      },

      // Schema genérico de error usado en 400/404/500
      ErrorResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'El ID de la empresa es requerido.' },
          error: { type: 'object', nullable: true }
        }
      },

      // (Opcional) Compañía corta para referencia si la querés usar en otras rutas
      CompanyShort: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'comp123' },
          legalName: { type: 'string', example: 'Mi Empresa' },
          taxId: { type: 'string', example: '123456789' },
          phone: { type: 'string', example: '+541112345678' },
          altEmail: { type: 'string', format: 'email', nullable: true, example: 'alt@example.com' },
          address: { type: 'string', nullable: true, example: 'Calle Falsa 123' },
          createdAt: { type: 'string', format: 'date-time', example: '2025-10-06T20:00:00Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2025-10-06T20:30:00Z' }
        }
      }
    }
  }
}
