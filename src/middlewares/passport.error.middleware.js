// Middleware para manejar errores de passport.authenticate
export const handlePassportError = (err, req, res, next) => {
  if (err) {

    const errorMessage = err.message || err;
    if (errorMessage === "El usuario ya existe" || errorMessage.includes("ya existe")) {
      return res.status(400).json({
        status: "error",
        message: "Usuario ya existe"
      });
    }
    return res.status(401).json({
      status: "error",
      message: errorMessage || "Error de autenticación"
    });
  }
  next();
};