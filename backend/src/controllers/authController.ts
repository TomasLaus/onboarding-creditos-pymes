import { Request, Response } from 'express'
import { solicitarRecuperacion, restablecerPassword } from '../services/authService'
import { transporter } from '../app'

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const backendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'

    const { link, token } = await solicitarRecuperacion(email, backendUrl)

    // Si estas en modo desarrollo, no mandamos el correo real
    if (process.env.NODE_ENV === 'development') {
      console.log(`📩 Link de recuperación para ${email}: ${link}`)
      return res.status(200).json({
        message: `Link generado (ver consola) 
        token: ${token}`
      })
    }

    // En produccion, si enviamos el correo real
    await transporter.sendMail({
      from: `"Soporte Onboarding Créditos" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Recuperación de contraseña',
      html: `<p>Hacé clic en el siguiente enlace para restablecer tu contraseña:</p>
             <a href="${link}">${link}</a>
             <p>El enlace expirará en 15 minutos.</p>`
    })

    res.status(200).json({ message: 'Correo enviado con éxito' })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, token, newPassword } = req.body
    if (!email || !token || !newPassword) return res.status(400).json({ message: 'Datos incompletos' })

    await restablecerPassword(token, email, newPassword)
    res.status(200).json({ message: 'Contraseña actualizada correctamente' })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}
