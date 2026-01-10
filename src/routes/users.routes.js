import { Router } from 'express';
import usersModel from "../model/users.model.js";
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';

const router = Router();

//Ruta para crear usuarios
router.post("/register", (req, res, next) => {
  passport.authenticate("register", (err, user) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Error interno"
      });
    }

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Usuario ya existe"
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Usuario registrado correctamente"
    });
  })(req, res, next);
});

router.get("/failregister", (req, res) => {
    res.status(400).json({ status: "error", message: "Registro fallido" });
});



export default router;