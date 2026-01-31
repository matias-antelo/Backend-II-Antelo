import { generateToken } from "../middlewares/auth.js";

class SessionsController {
  async login(req, res) {
    try {
      const token = generateToken(req.user);

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
      });

      res.json({
        status: "success"
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al iniciar sesión",
        error: error.message
      });
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("jwt");
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al cerrar sesión",
        error: error.message
      });
    }
  }

  loginFail(req, res) {
    res.status(401).json({
      status: "error"
    });
  }
}

export default new SessionsController();
