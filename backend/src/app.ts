import express from 'express'
import userRoutes from './routes/user'
import { swaggerUiMiddleware, swaggerUiSetup } from './config/swagger'
import nodemailer from 'nodemailer'
import companyRoutes from './routes/company'
//import authRoutes from './routes/auth';
// import errorHandler from './middlewares/errorHandler';
// import notFound from './middlewares/notFound';
import authRoutes from './routes/auth'
import loginRoutes from './routes/login'

const app = express()

app.use(express.json())

// Configuración de nodemailer (para activación de usuarios)
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})
// Swagger  API docs
app.use('/api/docs', swaggerUiMiddleware, swaggerUiSetup)

//API ROUTES
app.use('/api/users', userRoutes)
app.use('/api/company', companyRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/login', loginRoutes)

export default app
