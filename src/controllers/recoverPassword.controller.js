import recoverPasswordService from "../services/recoverPassword.service.js";
import nodemailer from "nodemailer";

class RecoverPasswordController {
  async showRecoverForm(req, res) {
    try {
      res.render("recoverPassword");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async requestReset(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "El email es requerido" });
      }

      // Solicitar reset
      const resetData = await recoverPasswordService.requestPasswordReset(email);

      // Generar enlace de reset
      const resetLink = `${process.env.BASE_URL || "http://localhost:3000"}/api/sessions/reset-password?token=${resetData.resetToken}&userId=${resetData.userId}`;

      // Enviar correo
      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
          user: process.env.MAILING_ACCOUNT,
          pass: process.env.MAILING_PASS
        }
      });

      const mailOptions = {
        from: process.env.MAILING_ACCOUNT,
        to: resetData.email,
        subject: "Recuperación de Contraseña - Laboratorio",
        html: `
          <h2>Recuperación de Contraseña</h2>
          <p>Has solicitado recuperar tu contraseña.</p>
          <p>Haz clic en el siguiente botón para restablecer tu contraseña:</p>
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0;">
            Restablecer Contraseña
          </a>
          <p>Este enlace expirará en 1 hora.</p>
          <p>Si no solicitaste esto, puedes ignorar este correo.</p>
          <hr>
          <small>Si el botón no funciona, copia este enlace: ${resetLink}</small>
        `
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        success: true,
        message: "Correo de recuperación enviado exitosamente"
      });
    } catch (error) {
      console.error("Error en requestReset:", error);
      return res.status(400).json({ error: error.message });
    }
  }

  async showResetForm(req, res) {
    try {
      const { token, userId } = req.query;

      if (!token || !userId) {
        return res.status(400).render("error", { message: "Token o usuario inválido" });
      }

      // Validar token
      const validToken = await recoverPasswordService.validateResetToken(token);

      // Renderizar formulario de reset con token y userId en atributos ocultos
      res.render("resetPassword", { token, userId });
    } catch (error) {
      console.error("Error en showResetForm:", error);
      res.status(400).render("error", { message: error.message });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, userId, password, passwordConfirm } = req.body;

      if (!token || !userId || !password || !passwordConfirm) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
      }

      if (password !== passwordConfirm) {
        return res.status(400).json({ error: "Las contraseñas no coinciden" });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
      }

      // Restablecer contraseña
      const result = await recoverPasswordService.resetPassword(token, password, userId);

      return res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      console.error("Error en resetPassword:", error);
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new RecoverPasswordController();
