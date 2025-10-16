//ENVIO CON GMAIL nodemailer

// import { transporter } from '../app'

// export function enviarEmailActivacion(backend_url: string | undefined, email: string, token: string, mensaje: string) {
//   // Generar link de activación
//   const activationLink = `http://${backend_url}/api/users/activate?token=${token}&email=${email}`

//   const mailOptions = {
//     from: process.env.SMTP_FROM || `"Soporte Onboarding PyMEs" <${process.env.SMTP_SENDER}>`, // remitente verificado
//     to: email,
//     subject: 'Activa tu cuenta',
//     text: `Haz click aquí para activar tu cuenta: ${activationLink}`,
//     html: `<a href="${activationLink}">${mensaje}</a>`
//   }

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('❌ Error enviando email de activación: ', error)
//       return
//     }
//     console.log(`📩 Email de activación enviado. Token: ${token}`, info.response)
//   })
// }

///////////////////////////////////
//ENVIO CON BREVO EN PRODUCCION
////////////////////////////////////

import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export const enviarEmailActivacion = async (
  backend_url: string | undefined,
  email: string,
  token: string,
  mensaje: string
) => {
  const activationLink = `http://${backend_url}/api/users/activate?token=${token}&email=${email}`
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { name: 'Soporte Onboarding PyMEs', email: `${process.env.SMTP_SENDER}` },
        to: [{ email }],
        subject: 'Activación de cuenta Onboarding PyMEs',
        htmlContent: `
          <p>Haz clic en el siguiente enlace para activar tu cuenta:</p>
          <a href="${activationLink}" target="_blank">${activationLink}</a>
        `
      },
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': process.env.BREVO_API_KEY // guarda esto en Render como secret
        }
      }
    )

    console.log('✅ Email enviado con Brevo API:', response.data)
  } catch (err: any) {
    console.error('❌ Error enviando email con Brevo API:', err.response?.data || err.message)
  }
}
