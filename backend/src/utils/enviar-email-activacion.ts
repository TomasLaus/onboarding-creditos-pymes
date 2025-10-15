import { transporter } from '../app'

export function enviarEmailActivacion(
  backend_url: string | undefined,
  email: string,
  token: string,
  mensaje: string
) {
  // Generar link de activación
  const activationLink = `http://${backend_url}/api/users/activate?token=${token}&email=${email}`

  const mailOptions = {
    from: process.env.SMTP_FROM || `"Soporte Onboarding PyMEs" <${process.env.SMTP_SENDER}>`, // remitente verificado
    to: email,
    subject: 'Activa tu cuenta',
    text: `Haz click aquí para activar tu cuenta: ${activationLink}`,
    html: `<a href="${activationLink}">${mensaje}</a>`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Error enviando email de activación: ', error)
      return
    }
    console.log(`📩 Email de activación enviado. Token: ${token}` , info.response)
  })
}

