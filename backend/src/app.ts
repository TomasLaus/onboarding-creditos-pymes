import express from 'express'
import userRoutes from './routes/user'
import { swaggerUiMiddleware, swaggerUiSetup } from './config/swagger'
import nodemailer from 'nodemailer'
import companyRoutes from './routes/company'
//import authRoutes from './routes/auth';
// import errorHandler from './middlewares/errorHandler';
// import notFound from './middlewares/notFound';

const app = express()

app.use(express.json())

// Configuración de nodemailer (ejemplo Gmail)

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // puerto SSL/TLS
  secure: true, // true para TLS/SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_GOOGLE_APP_PASS
  },
  tls: {
    servername: 'smtp.gmail.com', // obligatorio para TLS
    rejectUnauthorized: false // <--- ignorar certificado autofirmado
  }
})

// Swagger  API docs
app.use('/api/docs', swaggerUiMiddleware, swaggerUiSetup)
//API ROUTES
app.use('/api/users', userRoutes)
app.use('/api/company', companyRoutes)

export default app
