import cartsService from "../services/carts.service.js";

class CartsController {
  async getCartById(req, res) {
    try {
      const { id } = req.params;
      const cart = await cartsService.getCartById(id);

      if (!cart) {
        return res.status(404).json({
          status: "error",
          message: "Carrito no encontrado"
        });
      }

      res.json({
        status: "success",
        cart
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al obtener carrito",
        error: error.message
      });
    }
  }

  async addProductToCart(req, res) {
    try {
      const user = req.user;
      const { pid } = req.params;

      const cart = await cartsService.addProductToCart(user.cart, pid);

      res.json({
        status: "success",
        message: "Producto agregado al carrito",
        cart
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al agregar producto al carrito",
        error: error.message
      });
    }
  }

  async removeProductFromCart(req, res) {
    try {
      const user = req.user;
      const { pid } = req.params;

      const cart = await cartsService.removeProductFromCart(user.cart, pid);

      res.json({
        status: "success",
        message: "Producto removido del carrito",
        cart
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al remover producto del carrito",
        error: error.message
      });
    }
  }

  async updateCart(req, res) {
    try {
      const { id } = req.params;
      const { products } = req.body;

      const cart = await cartsService.updateCart(id, { products });

      res.json({
        status: "success",
        message: "Carrito actualizado correctamente",
        cart
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al actualizar carrito",
        error: error.message
      });
    }
  }

  async clearCart(req, res) {
    try {
      const user = req.user;

      const cart = await cartsService.clearCart(user.cart);

      res.json({
        status: "success",
        message: "Carrito vaciado correctamente",
        cart
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al vaciar carrito",
        error: error.message
      });
    }
  }
}

export default new CartsController();
