import { Router } from "express";
import passport from "passport";
import cartsController from "../controllers/carts.controller.js";

const router = Router();

// Obtener carrito por ID
router.get(
  "/carts/:id",
  passport.authenticate("jwt", { session: false }),
  cartsController.getCartById.bind(cartsController)
);

// Agregar producto al carrito
router.post(
  "/carts/products/:pid",
  passport.authenticate("jwt", { session: false }),
  cartsController.addProductToCart.bind(cartsController)
);

// Remover producto del carrito
router.delete(
  "/carts/products/:pid",
  passport.authenticate("jwt", { session: false }),
  cartsController.removeProductFromCart.bind(cartsController)
);

// Actualizar carrito
router.put(
  "/carts/:id",
  passport.authenticate("jwt", { session: false }),
  cartsController.updateCart.bind(cartsController)
);

// Vaciar carrito
router.delete(
  "/carts",
  passport.authenticate("jwt", { session: false }),
  cartsController.clearCart.bind(cartsController)
);

export default router;
