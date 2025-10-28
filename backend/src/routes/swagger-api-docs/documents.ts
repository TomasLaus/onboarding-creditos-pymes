export const documentSwagger = {
  paths: {
    '/document': {
      post: {
        summary: 'Agregar documentos a una solicitud de crédito existente',
        tags: ['document'],
        description:
          'Permite subir uno o más documentos (máximo 10) asociados a una solicitud de crédito existente. Los archivos se envían en formato multipart/form-data.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  creditId: {
                    type: 'string',
                    description: 'ID de la solicitud de crédito',
                    example: 'cred_12345'
                  },
                  uploadedById: {
                    type: 'string',
                    description: 'ID del usuario que sube los documentos',
                    example: 'usr_45678'
                  },
                  companyId: {
                    type: 'string',
                    description: 'ID de la empresa relacionada',
                    example: 'comp_78901'
                  },
                  files: {
                    type: 'array',
                    description: 'Archivos a subir (máximo 10)',
                    items: { type: 'string', format: 'binary' }
                  }
                },
                required: ['creditId', 'uploadedById', 'companyId', 'files']
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Documentos agregados correctamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Documentos agregados'
                    },
                    created: {
                      type: 'array',
                      description: 'Documentos creados y asociados a la solicitud',
                      items: { $ref: '#/components/schemas/DocumentShort' }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'No se enviaron archivos o faltan datos obligatorios',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Debe enviar al menos un archivo'
                    }
                  }
                }
              }
            }
          },
          500: {
            description: 'Error interno al agregar documentos',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Error al agregar documentos'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },

    '/document/creditApplication/{creditId}': {
      get: {
        summary: 'Listar documentos asociados a una solicitud de crédito',
        tags: ['document'],
        description:
          'Devuelve un array con todos los documentos previamente cargados en una solicitud de crédito específica.',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'creditId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'ID de la solicitud de crédito',
            example: 'cred_12345'
          }
        ],
        responses: {
          200: {
            description: 'Lista de documentos obtenida correctamente',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/DocumentShort' }
                }
              }
            }
          },
          500: {
            description: 'Error interno al listar documentos',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Error al listar documentos'
                    }
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
      DocumentShort: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'dni_frente.pdf' },
          type: { type: 'string', example: 'PDF' },
          url: { type: 'string', example: '/uploads/1761343712424-544996462.pdf' },
          mimeType: { type: 'string', example: 'application/pdf' },
          sizeMB: { type: 'number', example: 0.48 }
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
}
