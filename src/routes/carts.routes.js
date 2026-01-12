import { Router } from "express";
import passport from "passport";
import cartsModel from "../model/carts.model.js";

const router = Router();

// Agregar producto al carrito
router.post(
  "/carts/products/:pid",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      const productId = req.params.pid;

      const cart = await cartsModel.findById(user.cart);
      if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }

      const productInCart = cart.products.find(
        p => p.product.toString() === productId
      );

      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }

      await cart.save();
      res.json({ status: "success", message: "Producto agregado al carrito" });
    } catch (error) {
      res.status(500).json({ error: "Error al agregar producto" });
    }
  }
);

export default router;
