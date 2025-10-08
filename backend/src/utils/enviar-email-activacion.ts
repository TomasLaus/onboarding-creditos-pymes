import { transporter } from '../app'

export function enviarEmailActivacion(backend_url: string | undefined, email: string, token: string, mensaje: string) {
  // Enviar email de activación
  const activationLink = `http://${backend_url}/api/users/activate?token=${token}&email=${email}`
  const mailOptions = {
    from: '"Onboarding-Pymes" <onboardingpymestesting@gmail.com>',
    to: email,
    subject: 'Activa tu cuenta',
    text: `Haz click aquí para activar tu cuenta: ${activationLink}`,
    html: `<a href="${activationLink}">${mensaje}</a>`
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error sending email: ', error)
    }
    console.log('Email sent: ', info.response)
  })
}
