import swaggerUi from 'swagger-ui-express'
import { userSwagger } from '../routes/swagger-api-docs/user'
import { companySwagger } from '../routes/swagger-api-docs/company'

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentación',
    version: '1.0.0',
    description: 'Documentación de la API de onboarding-creditos-pymes'
  },
  servers: [{ url: 'http://localhost:3000/api' }],
  paths: { ...userSwagger.paths, ...companySwagger.paths },
  components: { ...userSwagger.components, ...companySwagger.components }
}

export const swaggerUiMiddleware = swaggerUi.serve
export const swaggerUiSetup = swaggerUi.setup(swaggerDocument)
