import nodemailer from 'nodemailer'

export const enviarEmailRecuperacion = async (to: string, link: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  const mailOptions = {
    from: '"Soporte Onboarding PyMEs" <no-reply@onboarding.com>',
    to,
    subject: 'Recuperación de contraseña',
    html: `
      <p>Has solicitado recuperar tu contraseña.</p>
      <p>Haz clic en el siguiente enlace para restablecerla (válido por 15 minutos):</p>
      <a href="${link}">${link}</a>
    `
  }

  await transporter.sendMail(mailOptions)
}
