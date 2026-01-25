import { Router } from "express";
import passport from "passport";
import productsController from "../controllers/products.controller.js";

const router = Router();

// Obtener todos los productos con paginación y filtros
router.get(
  "/",
  productsController.getAll.bind(productsController)
);

// Obtener producto por ID
router.get(
  "/:id",
  productsController.getById.bind(productsController)
);

// Crear producto (requiere autenticación - admin)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  productsController.create.bind(productsController)
);

// Actualizar producto (requiere autenticación - admin)
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  productsController.update.bind(productsController)
);

// Eliminar producto (requiere autenticación - admin)
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  productsController.delete.bind(productsController)
);

export default router;
