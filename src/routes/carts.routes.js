import { Router } from "express";
import passport from "passport";
import cartsController from "../controllers/carts.controller.js";

const router = Router();

// Obtener carrito por ID
router.get("/:id",
  passport.authenticate("jwt", { session: false }),
  cartsController.getCartById.bind(cartsController)
);

// Agregar producto al carrito
router.post("/products/:pid",
  passport.authenticate("jwt", { session: false }),
  cartsController.addProductToCart.bind(cartsController)
);

// Remover producto del carrito
router.delete("/products/:pid",
  passport.authenticate("jwt", { session: false }),
  cartsController.removeProductFromCart.bind(cartsController)
);

export default router;
