import { Router } from "express";
import passport from "passport";
import productsController from "../controllers/products.controller.js";
import { isAdmin } from "../middlewares/authorization.js";

const router = Router();

// Obtener todos los productos con paginación y filtros
router.get("/", productsController.getAll.bind(productsController));

// Crear producto (requiere autenticación - admin)
router.post("/", passport.authenticate("jwt", { session: false }), isAdmin,
  productsController.create.bind(productsController));

// Actualizar producto (requiere autenticación - admin)
router.put("/:id", passport.authenticate("jwt", { session: false }), isAdmin,
  productsController.update.bind(productsController));

// Eliminar producto (requiere autenticación - admin)
router.delete("/:id", passport.authenticate("jwt", { session: false }), isAdmin,
  productsController.delete.bind(productsController));

export default router;