import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Envía un correo de recuperación de contraseña
 * @param email Correo del usuario que solicita la recuperación
 * @param link Enlace para restablecer la contraseña
 */
export const enviarEmailRecuperacion = async (email: string, link: string) => {
  try {
    // Crear transporter (configuración SMTP de Brevo)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Configurar contenido del correo
    const mailOptions = {
      from: `"Soporte Onboarding PyMEs" <${process.env.SMTP_SENDER}>`,
      to: email,
      subject: "Recuperación de contraseña",
      html: `
        <p>Has solicitado recuperar tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para restablecerla (válido por 15 minutos):</p>
        <a href="${link}" target="_blank">${link}</a>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📩 Email de recuperación enviado a ${email}: ${info.messageId}`);
  } catch (error: any) {
    console.error("❌ Error al enviar email de recuperación:", error.message);
    throw new Error(`No se pudo enviar el email de recuperación ${error.message}`);
  }
};
