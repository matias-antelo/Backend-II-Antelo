import cartsRepository from "../repositories/carts.repository.js";
import productsService from "./products.service.js";

class CartsService {
  async getCartById(id, populate = true) {
    try {
      const cart = await cartsRepository.getCartById(id, populate);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
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
      // Validar que el producto exista PRIMERO (antes de modificar el carrito)
      const product = await productsService.getProductById(productId);
      if (!product) {
        throw new Error("Producto no encontrado");
      }

      // Validar que haya stock
      if (product.stock <= 0) {
        throw new Error("Producto sin stock disponible");
      }

      // Obtener el carrito actual SIN populate para trabajar con ObjectIds
      const cart = await cartsRepository.getCartById(cartId, false);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      // Convertir productId a ObjectId para comparación correcta
      const mongoose = (await import("mongoose")).default;
      const productObjectId = new mongoose.Types.ObjectId(productId);

      // Convertir el carrito a objeto plano si es necesario
      const cartProducts = cart.products || [];

      // Verificar si el producto ya está en el carrito
      // Comparar ObjectIds correctamente
      const productInCartIndex = cartProducts.findIndex(
        (p) => {
          const existingProductId = p.product instanceof mongoose.Types.ObjectId 
            ? p.product 
            : new mongoose.Types.ObjectId(p.product.toString());
          return existingProductId.equals(productObjectId);
        }
      );

      let updatedProducts;
      if (productInCartIndex !== -1) {
        // El producto ya existe, incrementar cantidad
        updatedProducts = cartProducts.map((item, index) => {
          if (index === productInCartIndex) {
            return {
              product: item.product,
              quantity: item.quantity + 1
            };
          }
          return item;
        });
      } else {
        // El producto no existe, agregarlo
        updatedProducts = [
          ...cartProducts,
          { product: productObjectId, quantity: 1 }
        ];
      }

      // Guardar cambios
      const updatedCart = await cartsRepository.updateCart(cartId, {
        products: updatedProducts
      });

      // Retornar el carrito populado para mostrar información completa
      return await cartsRepository.getCartById(cartId, true);
    } catch (error) {
      throw new Error(`Error al agregar producto al carrito: ${error.message}`);
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      // Obtener el carrito SIN populate para trabajar con ObjectIds
      const cart = await cartsRepository.getCartById(cartId, false);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      // Convertir productId a ObjectId para comparación correcta
      const mongoose = (await import("mongoose")).default;
      const productObjectId = new mongoose.Types.ObjectId(productId);

      // Filtrar el producto comparando ObjectIds correctamente
      const cartProducts = cart.products || [];
      const updatedProducts = cartProducts.filter(
        (p) => {
          const existingProductId = p.product instanceof mongoose.Types.ObjectId 
            ? p.product 
            : new mongoose.Types.ObjectId(p.product.toString());
          return !existingProductId.equals(productObjectId);
        }
      );

      const updatedCart = await cartsRepository.updateCart(cartId, {
        products: updatedProducts
      });

      // Retornar el carrito populado para mostrar información completa
      return await cartsRepository.getCartById(cartId, true);
    } catch (error) {
      throw new Error(`Error al remover producto del carrito: ${error.message}`);
    }
  }
}

export default new CartsService();
