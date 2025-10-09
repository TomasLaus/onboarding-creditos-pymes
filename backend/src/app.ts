import express from 'express'
import userRoutes from './routes/user'
import { swaggerUiMiddleware, swaggerUiSetup } from './config/swagger'
import nodemailer from 'nodemailer'
import authRoutes from './routes/auth'

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

// Swagger docs
app.use('/api/docs', swaggerUiMiddleware, swaggerUiSetup)

// Rutas de usuario y autenticación
app.use('/api/users', userRoutes)

// Ruta de autenticación para cambio de contraseña
app.use('/api/auth', authRoutes)

export default app
