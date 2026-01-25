import cartsRepository from "../repositories/carts.repository.js";
import productsRepository from "../repositories/products.repository.js";

class CartsService {
  async getCartById(id) {
    try {
      const cart = await cartsRepository.getCartById(id);
      return cart;
    } catch (error) {
      throw new Error(`Error al obtener carrito: ${error.message}`);
    }
  }

  async createCart(data) {
    try {
      const cart = await cartsRepository.createCart(data);
      return cart;
    } catch (error) {
      throw new Error(`Error al crear carrito: ${error.message}`);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      // Obtener el carrito actual
      const cart = await cartsRepository.getCartById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      // Validar que el producto exista
      const product = await productsRepository.getProductById(productId);
      if (!product) {
        throw new Error("Producto no encontrado");
      }

      // Validar que haya stock
      if (product.stock <= 0) {
        throw new Error("Producto sin stock disponible");
      }

      // Verificar si el producto ya está en el carrito
      const productInCart = cart.products.find(
        (p) => p.product.toString() === productId
      );

      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }

      // Guardar cambios
      const updatedCart = await cartsRepository.updateCart(cartId, {
        products: cart.products
      });

      return updatedCart;
    } catch (error) {
      throw new Error(`Error al agregar producto al carrito: ${error.message}`);
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await cartsRepository.getCartById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      // Filtrar el producto
      const updatedProducts = cart.products.filter(
        (p) => p.product.toString() !== productId
      );

      const updatedCart = await cartsRepository.updateCart(cartId, {
        products: updatedProducts
      });

      return updatedCart;
    } catch (error) {
      throw new Error(`Error al remover producto del carrito: ${error.message}`);
    }
  }

  async updateCart(cartId, data) {
    try {
      const cart = await cartsRepository.updateCart(cartId, data);
      return cart;
    } catch (error) {
      throw new Error(`Error al actualizar carrito: ${error.message}`);
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await cartsRepository.updateCart(cartId, { products: [] });
      return cart;
    } catch (error) {
      throw new Error(`Error al vaciar carrito: ${error.message}`);
    }
  }
}

export default new CartsService();
