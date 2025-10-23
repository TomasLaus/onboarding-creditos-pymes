import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

import userRoutes from './routes/user'
import companyRoutes from './routes/company'
import authRoutes from './routes/auth'
import loginRoutes from './routes/login'
import documentRoutes from './routes/document'
import creditApplicationRoutes from './routes/creditApplication'
import { swaggerUiMiddleware, swaggerUiSetup } from './config/swagger'

// ---------------------------------------------------------------
// SMTP Config
// ---------------------------------------------------------------

// Configuración de nodemailer (para activación de usuarios)
// export const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT) || 587,
//   secure: false, // STARTTLS
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// })

console.log('Configuración SMTP:')
console.log('SMTP_HOST:', process.env.SMTP_HOST)
console.log('SMTP_PORT:', process.env.SMTP_PORT)
console.log('SMTP_USER:', process.env.SMTP_USER)
console.log('SMTP_PASS:', process.env.SMTP_PASS?.slice(0, 10) + '...')

async function testSMTP() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  await transporter.verify()
  console.log('✅ Conexión SMTP exitosa')
}

testSMTP().catch(console.error)

// ---------------------------------------------------------------
// Express App
// ---------------------------------------------------------------
const app = express()

app.use(express.json())

// ✅ CORS — solo una vez y antes de las rutas
app.use(
  cors({
    origin: [
      'http://localhost:3000', // si usás React
      'http://localhost:5173', // si usás Vite
      'https://onboarding-creditos-pymes.onrender.com', // backend Render (por si se llama a sí mismo)
      'https://onboarding-creditos-pymes.vercel.app' // frontend Vercel
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
)

// ✅ Para responder OPTIONS correctamente
app.options('*', cors())

// ---------------------------------------------------------------
// Rutas
// ---------------------------------------------------------------
app.use('/api/docs', swaggerUiMiddleware, swaggerUiSetup)
app.use('/api/users', userRoutes)
app.use('/api/company', companyRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/credit-applications', creditApplicationRoutes)
app.use('/api/document', documentRoutes)

// ---------------------------------------------------------------
// Debug de rutas
// ---------------------------------------------------------------
app._router.stack.forEach((r: any) => {
  if (r.route && r.route.path) {
    console.log('🛣 Ruta registrada:', r.route.path)
  } else if (r.name === 'router' && r.handle.stack) {
    r.handle.stack.forEach((handler: any) => {
      if (handler.route) {
        console.log('🛣 Ruta registrada:', handler.route.path)
      }
    })
  }
})

// ---------------------------------------------------------------
// La carpeta uploads/ debe existir en tu proyecto.
//crearla automáticamente al iniciar el servidor:
// ---------------------------------------------------------------
import fs from 'fs'

const uploadDir = 'uploads/'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

// ---------------------------------------------------------------
// Servir archivos estáticos (opcional)
// permite poder acceder a los archivos desde el navegador:
// ---------------------------------------------------------------

app.use('/uploads', express.static('uploads'))

// ---------------------------------------------------------------
// exportar app
// ---------------------------------------------------------------

export default app
