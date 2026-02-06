import cartsRepository from "../repositories/carts.repository.js";
import productsService from "./products.service.js";
import productsRepository from "../repositories/products.repository.js";
import ticketsRepository from "../repositories/tickets.repository.js";

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
      const cart = await cartsRepository.getCartById(cartId, false);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      const mongoose = (await import("mongoose")).default;
      const productObjectId = new mongoose.Types.ObjectId(productId);

      const updatedProducts = (cart.products || []).filter(p => {
        const existingProductId = p.product instanceof mongoose.Types.ObjectId
          ? p.product
          : new mongoose.Types.ObjectId(p.product.toString());

        return !existingProductId.equals(productObjectId);
      });

      await cartsRepository.updateCart(cartId, {
        products: updatedProducts
      });

      // 🔑 devolver carrito limpio
      const populatedCart = await cartsRepository.getCartById(cartId, true);

      populatedCart.products = populatedCart.products.filter(p => p.product);

      return populatedCart;
    } catch (error) {
      throw new Error(`Error al remover producto del carrito: ${error.message}`);
    }
  }

  async purchaseCart(cartId, purchaserEmail) {
    try {
      const cart = await this.getCartById(cartId, true);
      const cartProducts = cart.products || [];

      const purchasedItems = [];
      const failedItems = [];
      let amount = 0;

      for (const item of cartProducts) {
        if (!item.product) continue;

        // item.product es un objeto poblado, así que accede a _id
        const productId = item.product._id || item.product;
        const qty = item.quantity;
        const price = item.product.price || 0;

        // Intentar decrementar stock de forma atómica
        const updatedProduct = await productsRepository.decrementStockIfAvailable(productId, qty);

        if (updatedProduct) {
          purchasedItems.push({ product: productId, quantity: qty, price });
          amount += qty * price;
        } else {
          failedItems.push({ productId: productId.toString(), requested: qty, available: item.product.stock || 0 });
        }
      }

      let ticket = null;
      if (purchasedItems.length > 0) {
        const code = `TICKET-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        const status = failedItems.length > 0 ? "partial" : "completed";

        ticket = await ticketsRepository.createTicket({
          code,
          purchase_datetime: new Date(),
          amount,
          purchaser: purchaserEmail,
          products: purchasedItems,
          status
        });
      }

      // Remover del carrito los items que fueron comprados
      const purchasedProductIds = purchasedItems.map(p => p.product.toString());
      const remainingProducts = (cartProducts || []).filter(item => {
        const pid = item.product && (item.product._id ? item.product._id.toString() : item.product.toString());
        return !purchasedProductIds.includes(pid);
      });

      await cartsRepository.updateCart(cartId, { products: remainingProducts });

      return { ticket, failedItems, status: ticket ? ticket.status : "failed" };
    } catch (error) {
      throw new Error(`Error al procesar compra: ${error.message}`);
    }
  }
}

export default new CartsService();
