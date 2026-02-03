import usersRepository from "../repositories/users.repository.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import transporter from "../config/mailer.config.js";

class RecoverPasswordService {

    async requestPasswordReset(email) {
        const user = await usersRepository.getUserByEmail(email);

        if (!user) {
            throw new Error("El correo no está registrado");
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        const expiresIn = 60 * 60 * 1000;

        await usersRepository.updateResetToken(user._id, hashedToken, expiresIn);
        await this.sendRecoveryEmail({
            email: user.email,
            resetToken,
            userId: user._id
        });

        return {
            success: true,
            message: "Correo de recuperación enviado exitosamente"
        };
    }

    async sendRecoveryEmail({ email, resetToken, userId }) {
        const resetLink = `${process.env.BASE_URL}/api/sessions/reset-password?token=${resetToken}&userId=${userId}`;

        const mailOptions = {
            from: process.env.MAILING_ACCOUNT,
            to: email,
            subject: "Recuperación de Contraseña - Laboratorio",
            html: `<h2>Recuperación de Contraseña</h2> 
            <p>Has solicitado recuperar tu contraseña.</p> 
            <p>Haz clic en el siguiente botón para restablecer tu contraseña:</p> 
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0;"> 
            Restablecer Contraseña </a> 
            <p>Este enlace expirará en 1 hora.</p> <p>Si no solicitaste esto, puedes ignorar este correo.</p> 
            <hr> <small>Si el botón no funciona, copia este enlace: ${resetLink}
            </small>`
        };

        await transporter.sendMail(mailOptions);
    }

    async validateResetToken(token) {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await usersRepository.getUserByResetToken(hashedToken);

        if (!user) {
            throw new Error("Token inválido o expirado");
        }

        return { success: true, userId: user._id, email: user.email };
    }

    async resetPassword(token, newPassword, userId) {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await usersRepository.getUserByResetToken(hashedToken);

        if (!user) throw new Error("Token inválido o expirado");
        if (user._id.toString() !== userId.toString()) {
            throw new Error("Token no válido para este usuario");
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            throw new Error("La nueva contraseña no puede ser igual a la anterior");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await usersRepository.updateUser(user._id, { password: hashedPassword });
        await usersRepository.clearResetToken(user._id);

        return { success: true, message: "Contraseña restablecida exitosamente" };
    }
}

export default new RecoverPasswordService();