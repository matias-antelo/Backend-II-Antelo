import { Router } from 'express';
import usersController from "../controllers/users.controller.js";
import passport from 'passport';

const router = Router();

// Ruta para crear usuarios
router.post("/register", (req, res, next) => {
  usersController.register(req, res, next);
});

// Ruta para obtener usuario por ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  usersController.getUserById.bind(usersController)
);

export default router;