import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentación',
        version: '1.0.0',
        description: 'Documentación de la API de onboarding-creditos-pymes',
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: [__dirname + '/../routes/swagger-api-docs/user.txt'],
};

export const swaggerSpec = swaggerJSDoc(options);
export const swaggerUiMiddleware = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);