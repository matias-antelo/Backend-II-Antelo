import { Router } from "express";
import recoverPasswordController from "../controllers/recoverPassword.controller.js";

const router = Router();

// Mostrar formulario de recuperación
router.get("/recover-password", recoverPasswordController.showRecoverForm);

// Solicitar recuperación de contraseña
router.post("/request-reset", recoverPasswordController.requestReset);

// Mostrar formulario de reset con token validado
router.get("/reset-password", recoverPasswordController.showResetForm);

// Procesar reset de contraseña
router.post("/reset-password", recoverPasswordController.resetPassword);

export default router;
