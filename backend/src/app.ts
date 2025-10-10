import express from 'express'
import userRoutes from './routes/user'
import { swaggerUiMiddleware, swaggerUiSetup } from './config/swagger'
import nodemailer from 'nodemailer'
import authRoutes from './routes/auth'

const app = express()

app.use(express.json())

// Configuración de nodemailer (para activación de usuarios)
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // true para TLS/SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})

// Swagger docs
app.use('/api/docs', swaggerUiMiddleware, swaggerUiSetup)

// Rutas de usuario y autenticación
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

export default app
