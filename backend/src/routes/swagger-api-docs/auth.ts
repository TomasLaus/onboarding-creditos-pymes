export const authSwagger = {
    paths: {
        '/auth/login': {
            post: {
                summary: 'Iniciar sesión',
                description: 'Autentica a un usuario y devuelve un token JWT',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: {
                                        type: 'string',
                                        format: 'email',
                                        example: 'empresa@test.com'
                                    },
                                    password: {
                                        type: 'string',
                                        example: '123456'
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Login exitoso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        message: { type: 'string', example: 'Login exitoso' },
                                        user: { $ref: '#/components/schemas/User' },
                                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: 'Credenciales inválidas',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: false },
                                        message: { type: 'string', example: 'Credenciales inválidas' }
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        description: 'Usuario inactivo',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: false },
                                        message: { type: 'string', example: 'Usuario inactivo. Contacta al administrador.' }
                                    }
                                }
                            }
                        }
                    },
                    429: {
                        description: 'Cuenta bloqueada por intentos fallidos',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: false },
                                        message: { type: 'string', example: 'Cuenta bloqueada temporalmente por intentos fallidos.' },
                                        lockedUntil: { type: 'string', format: 'date-time' }
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
                                        success: { type: 'boolean', example: false },
                                        message: { type: 'string', example: 'Error interno del servidor' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/auth/verify': {
            get: {
                summary: 'Verificar token JWT',
                description: 'Verifica la validez del token JWT en el header Authorization',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: 'Token válido',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        message: { type: 'string', example: 'Token válido' },
                                        user: { $ref: '#/components/schemas/User' }
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        description: 'Token inválido o expirado',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: false },
                                        message: { type: 'string', example: 'Token inválido o expirado' }
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
                                        success: { type: 'boolean', example: false },
                                        message: { type: 'string', example: 'Error interno del servidor' }
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
                    id: { type: 'string', example: 'clx123abc456def' },
                    name: { type: 'string', example: 'Empresa Test' },
                    email: { type: 'string', format: 'email', example: 'empresa@test.com' },
                    role: {
                        type: 'string',
                        enum: ['ADMIN', 'OPERATOR', 'PYME'],
                        example: 'PYME'
                    },
                    isActive: { type: 'boolean', example: true },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' }
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
};