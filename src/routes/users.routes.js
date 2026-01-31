import { Router } from 'express';
import usersController from "../controllers/users.controller.js";
import passport from 'passport';
import { handlePassportError } from '../middlewares/passport.error.middleware.js';

const router = Router();

// Ruta para crear usuarios
router.post("/register",
  passport.authenticate("register", { session: false, failWithError: true }),
  usersController.register.bind(usersController),
  handlePassportError);

// Ruta para obtener usuario por ID
router.get("/:id",
  passport.authenticate("jwt", { session: false }),
  usersController.getUserById.bind(usersController));

export default router;