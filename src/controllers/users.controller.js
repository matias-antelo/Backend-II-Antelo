import usersService from "../services/users.service.js";

class UsersController {
  async register(req, res) {
    try {
      res.status(201).json({
        status: "success",
        message: "Usuario registrado correctamente"
      });
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
      const userDTO = await usersService.getCurrentUser(req.user._id);
      res.json({
        status: "success",
        user: userDTO
      });
    } catch (error) {
      if (error.message === "Usuario no encontrado") {
        return res.status(404).json({
          status: "error",
          message: error.message
        });
      }
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

  renderLogin(req, res) {
    try {
      res.render('login', { title: "LOGGIN" });
    } catch (error) {
      res.status(500).send("Error al cargar página de login");
    }
  }

  renderRegistration(req, res) {
    try {
      res.render('registration', { title: "Registro" });
    } catch (error) {
      res.status(500).send("Error al cargar página de registro");
    }
  }
}

export default new UsersController();