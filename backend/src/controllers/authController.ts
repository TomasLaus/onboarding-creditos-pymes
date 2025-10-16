import { Request, Response } from "express";
import dotenv from "dotenv";
import { solicitarRecuperacion, restablecerPassword } from "../services/authService";
import { enviarEmailRecuperacion } from "../utils/enviar-email-recuperacion";

dotenv.config();

/**
 * Controlador: Solicitud de recuperación de contraseña
 */
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "El email es obligatorio" });
    }

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    // Generamos token y link de recuperación
    const { link, token } = await solicitarRecuperacion(email, frontendUrl);

    // Enviamos el correo
    await enviarEmailRecuperacion(email, link);

    res.status(200).json({
      message: `Correo de recuperación enviado correctamente token: ${token}`,
      token: process.env.NODE_ENV === "development" ? token : undefined, // solo para debug
    });
  } catch (error: any) {
    console.error("❌ Error en forgotPassword:", error.message);
    res.status(500).json({ message: "No se pudo enviar el correo de recuperación" });
  }
};

/**
 * Controlador: Restablecer contraseña
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, token, newPassword } = req.body;

    if (!email || !token || !newPassword) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    await restablecerPassword(token, email, newPassword);

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (err: any) {
    console.error("❌ Error en resetPassword:", err.message);
    res.status(400).json({ message: err.message });
  }
};
