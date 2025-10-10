import nodemailer from 'nodemailer'

export const enviarEmailRecuperacion = async (to: string, link: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // true si es 465 (SSL), false si es 587 (TLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const mailOptions = {
    from: `"Soporte Onboarding PyMEs" <${process.env.SMTP_USER}>`,
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
