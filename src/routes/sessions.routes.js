import { Router } from "express";
import passport from "passport";
import { generateToken } from "../middlewares/auth.js";

const router = Router();

// LOGIN
router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/login-fail"
  }),
  (req, res) => {
    const token = generateToken(req.user);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    });

    res.json({
      status: "success",
    });
  }
);

// LOGIN FAIL
router.get("/login-fail", (req, res) => {
  res.status(401).json({
    status: "error",
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.json({ status: "success" });
});

// CURRENT
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({
      status: "success",
      user: {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role
      }
    });
  }
);

export default router;
