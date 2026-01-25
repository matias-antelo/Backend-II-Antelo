import productsRepository from "../repositories/products.repository.js";

class ProductsService {
  async getProductsFromQuery(queryParams) {
    try {
      const products = await productsRepository.getProductsFromQuery(queryParams);
      return products;
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await productsRepository.getProductById(id);
      return product;
    } catch (error) {
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  }

  async createProduct(productData) {
    try {
      // Validar datos obligatorios
      if (!productData.title || !productData.price || !productData.category) {
        throw new Error("Faltan campos obligatorios");
      }

      // Validar que el precio sea positivo
      if (productData.price < 0) {
        throw new Error("El precio debe ser positivo");
      }

      // Validar que el stock sea válido
      if (productData.stock && productData.stock < 0) {
        throw new Error("El stock no puede ser negativo");
      }

      const product = await productsRepository.createProduct(productData);
      return product;
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }

  async updateProduct(id, productData) {
    try {
      // Validar datos
      if (productData.price && productData.price < 0) {
        throw new Error("El precio debe ser positivo");
      }

      if (productData.stock && productData.stock < 0) {
        throw new Error("El stock no puede ser negativo");
      }

      const product = await productsRepository.updateProduct(id, productData);
      return product;
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  }

  async deleteProduct(id) {
    try {
      const product = await productsRepository.deleteProduct(id);
      return product;
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${error.message}`);
    }
  }
}

export default new ProductsService();
