export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: "error",
      message: "No autorizado. Debes iniciar sesión para acceder a este recurso.",
    });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "error",
      message: "Acceso denegado. Solo los administradores pueden crear, actualizar o eliminar productos.",
    });
  }
  next();
};

export const isUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: "error",
      message: "No autorizado. Debes iniciar sesión para acceder a este recurso.",
    });
  }
  if (req.user.role !== "user") {
    return res.status(403).json({
      status: "error",
      message: "Acceso denegado. Solo los usuarios pueden agregar productos a su carrito.",
    });
  }
  next();
};