import dotenv from 'dotenv'
dotenv.config()
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
import cors from 'cors'

// Verificación de configuración SMTP al iniciar la app
// ---------------------------------------------------------------
console.log('Configuración SMTP:')
console.log('SMTP_HOST:', process.env.SMTP_HOST)
console.log('SMTP_PORT:', process.env.SMTP_PORT)
console.log('SMTP_USER:', process.env.SMTP_USER)
console.log('SMTP_PASS:', process.env.SMTP_PASS?.slice(0, 10) + '...')

async function testSMTP() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
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

  await transporter.verify()
  console.log('✅ Conexión SMTP exitosa')
}

testSMTP().catch(console.error)

// ---------------------------------------------------------------

const app = express()

app.use(express.json())

// ✅ Permitir cualquier origen
app.use(cors())

// o, si querés hacerlo explícito:
app.use(
  cors({
    origin: '*', // permite todo
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

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

// Configuración de nodemailer para producción
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: true, // STARTTLS
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

app._router.stack.forEach((r: any) => {
  if (r.route && r.route.path) {
    console.log("🛣 Ruta registrada:", r.route.path);
  } else if (r.name === 'router' && r.handle.stack) {
    r.handle.stack.forEach((handler: any) => {
      if (handler.route) {
        console.log("🛣 Ruta registrada:", handler.route.path);
      }
    });
  }
});

export default app
