import { Request, Response } from 'express'
import { solicitarRecuperacion, restablecerPassword } from '../services/authService'
import { enviarEmailRecuperacion } from '../utils/enviar-email-recuperacion'

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const backendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'

    const { link, token } = await solicitarRecuperacion(email, backendUrl)

    if (process.env.NODE_ENV === 'development') {
      console.log(`📩 Link de recuperación para ${email}: ${link}`)
      return res.status(200).json({
        message: `Link generado (ver consola)`,
        token
      })
    }

    // en produccipn usamos la función util
    await enviarEmailRecuperacion(email, link)

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
