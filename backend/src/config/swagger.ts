import swaggerUi from 'swagger-ui-express'
import { userSwagger } from '../routes/swagger-api-docs/user'
import { companySwagger } from '../routes/swagger-api-docs/company'
import { creditApplicationSwagger } from '../routes/swagger-api-docs/creditApplication'
import { documentSwagger } from '../routes/swagger-api-docs/documents'
import { authSwagger } from '../routes/swagger-api-docs/auth'

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentación',
    version: '1.0.0',
    description: 'Documentación de la API de onboarding-creditos-pymes'
  },
  servers: [{ url: 'http://localhost:3000/api' }],
  paths: {
    ...userSwagger.paths,
    ...companySwagger.paths,
    ...creditApplicationSwagger.paths,
    ...documentSwagger.paths,
    ...authSwagger.paths
  }
  // components: {
  //   ...userSwagger.components,
  //   ...companySwagger.components,
  //   ...creditApplicationSwagger.components,
  //   ...documentSwagger.components
  // }
}

export const swaggerUiMiddleware = swaggerUi.serve
export const swaggerUiSetup = swaggerUi.setup(swaggerDocument)
