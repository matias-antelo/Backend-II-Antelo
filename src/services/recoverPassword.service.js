import usersRepository from "../repositories/users.repository.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

class RecoverPasswordService {
  async requestPasswordReset(email) {
    try {
      const user = await usersRepository.getUserByEmail(email);

      if (!user) {
        throw new Error("El correo no está registrado");
      }

      const resetToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
      const expiresIn = 60 * 60 * 1000; // 1 hora en ms
      await usersRepository.updateResetToken(user._id, hashedToken, expiresIn);

      return {
        success: true,
        resetToken,
        userId: user._id,
        email: user.email,
        message: "Correo de recuperación enviado exitosamente"
      };
    } catch (error) {
      throw error;
    }
  }

  async validateResetToken(token) {
    try {
      const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
      const user = await usersRepository.getUserByResetToken(hashedToken);

      if (!user) {
        throw new Error("Token inválido o expirado");
      }

      return {
        success: true,
        userId: user._id,
        email: user.email
      };
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(token, newPassword, userId) {
    try {
      const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
      const user = await usersRepository.getUserByResetToken(hashedToken);

      if (!user) {
        throw new Error("Token inválido o expirado");
      }

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

      return {
        success: true,
        message: "Contraseña restablecida exitosamente"
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new RecoverPasswordService();
