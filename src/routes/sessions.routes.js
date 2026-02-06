import { Router } from "express";
import passport from "passport";
import sessionsController from "../controllers/sessions.controller.js";
import usersController from "../controllers/users.controller.js";

const router = Router();

// LOGIN
router.post("/login",
  passport.authenticate("login", {
    session: false,
    failWithError: true
  }),
  sessionsController.login.bind(sessionsController),
  sessionsController.loginFail.bind(sessionsController)
);

// LOGOUT
router.post("/logout", sessionsController.logout.bind(sessionsController));

// CURRENT - Obtener usuario actual
router.get("/current",
  passport.authenticate("jwt", { session: false }),
  usersController.getCurrentUser.bind(usersController)
);

export default router;