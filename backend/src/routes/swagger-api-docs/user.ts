export const userSwagger = {
  paths: {
    '/users/create': {
      post: {
        summary: 'Crear un nuevo usuario con empresa asociada',
        tags: ['user'],
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
                  twoFactorSecret: { type: 'string', description: 'Opcional, secreto para 2FA' },
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
          '201': {
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
                        email: { type: 'string', example: 'test@example.com' },
                        legalName: { type: 'string', example: 'Mi Empresa' },
                        taxId: { type: 'string', example: '123456789' },
                        phone: { type: 'string', example: '+541112345678' },
                        tokenActivacion: { type: 'string', example: '8d86cca9945f...' }
                      }
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Campos faltantes o RUC inválido',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Todos los campos son requeridos.' } }
                }
              }
            }
          },
          '409': {
            description: 'Usuario o empresa ya existente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'ese usuario ya existe. verificar email.' } }
                }
              }
            }
          },
          '500': {
            description: 'Error interno al crear el usuario',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { message: { type: 'string' }, error: { type: 'object' } } }
              }
            }
          }
        }
      }
    },

    '/users/activate': {
      get: {
        summary: 'Activar cuenta de usuario',
        tags: ['user'],
        parameters: [
          { name: 'token', in: 'query', required: true, schema: { type: 'string' } },
          { name: 'email', in: 'query', required: true, schema: { type: 'string', format: 'email' } }
        ],
        responses: {
          '200': {
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
          '400': {
            description: 'Token inválido, expirado o cuenta ya activada',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { message: { type: 'string', example: 'Token inválido' } } }
              }
            }
          },
          '404': {
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
          '500': {
            description: 'Error interno al activar usuario',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { message: { type: 'string' }, error: { type: 'object' } } }
              }
            }
          }
        }
      }
    },

    '/users/changePassword': {
      post: {
        summary: 'Cambiar la contraseña del usuario',
        tags: ['user'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: 'ckl9z1abc0000xyz' },
                  oldPassword: { type: 'string', example: 'ViejaClave123!' },
                  newPassword: { type: 'string', example: 'NuevaClave123!' }
                },
                required: ['id', 'oldPassword', 'newPassword']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Contraseña cambiada exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Contraseña cambiada exitosamente.' } }
                }
              }
            }
          },
          '400': {
            description: 'Campos faltantes',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Todos los campos son requeridos.' } }
                }
              }
            }
          },
          '401': {
            description: 'Contraseña actual incorrecta',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Contraseña actual incorrecta.' } }
                }
              }
            }
          },
          '404': {
            description: 'Usuario no encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Usuario no encontrado.' } }
                }
              }
            }
          },
          '500': {
            description: 'Error interno al cambiar contraseña',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { message: { type: 'string' }, error: { type: 'object' } } }
              }
            }
          }
        }
      }
    },

    '/users/getAll': {
      get: {
        summary: 'Obtener todos los usuarios',
        tags: ['user'],
        responses: {
          '501': {
            description: 'Funcionalidad no implementada',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Funcionalidad no implementada.' } }
                }
              }
            }
          },
          '500': {
            description: 'Error al consultar los usuarios',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { message: { type: 'string' }, error: { type: 'object' } } }
              }
            }
          }
        }
      }
    },

    '/users/deleteAll': {
      delete: {
        summary: 'Eliminar todos los usuarios (solo testing)',
        tags: ['user'],
        responses: {
          '200': {
            description: 'Todos los usuarios fueron eliminados',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Todos los usuarios han sido eliminados.' } }
                }
              }
            }
          },
          '500': {
            description: 'Error interno al eliminar usuarios',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { message: { type: 'string' }, error: { type: 'object' } } }
              }
            }
          }
        }
      }
    }
  },

  components: {
    // schemas: {
    //   User: {
    //     type: 'object',
    //     properties: {
    //       id: { type: 'string', example: 'ckl9z1abc0000xyz' },
    //       email: { type: 'string', example: 'test@example.com' },
    //       password: { type: 'string', example: '$2b$10$hashedPassword' },
    //       isActive: { type: 'boolean', example: false },
    //       role: { type: 'string', example: 'CLIENT' },
    //       createdAt: { type: 'string', example: '2025-10-06T20:00:00Z' },
    //       updatedAt: { type: 'string', example: '2025-10-06T21:00:00Z' }
    //     }
    //   }
    // }
  }
}
