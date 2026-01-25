import usersService from "../services/users.service.js";
import passport from "passport";

class UsersController {
  async register(req, res, next) {
    try {
      passport.authenticate("register", (err, user) => {
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
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al registrar usuario",
        error: error.message
      });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = await usersService.getUserById(req.user._id);

      res.json({
        status: "success",
        user: {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al obtener usuario actual",
        error: error.message
      });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await usersService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "Usuario no encontrado"
        });
      }

      res.json({
        status: "success",
        user
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al obtener usuario",
        error: error.message
      });
    }
  }
}

export default new UsersController();
