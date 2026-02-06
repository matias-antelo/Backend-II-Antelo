import recoverPasswordService from "../services/recoverPassword.service.js";

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

            const result = await recoverPasswordService.requestPasswordReset(email);

            return res.status(200).json(result);

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
            const validToken = await recoverPasswordService.validateResetToken(token);
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