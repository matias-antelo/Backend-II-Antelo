import productsRepository from "../repositories/products.repository.js";

class ProductsService {
  async getProductsFromQuery(queryParams) {
    try {
      // Parsear y validar parámetros (lógica de negocio)
      let { limit, page, sort, query } = queryParams;

      limit = parseInt(limit) || 10;
      page = parseInt(page) || 1;

      // Validar límites (reglas de negocio)
      if (limit < 1 || limit > 100) {
        limit = 10; // Valor por defecto si está fuera de rango
      }
      if (page < 1) {
        page = 1;
      }

      // Construir filtros según reglas de negocio
      const filter = {};
      if (query) {
        filter.category = query;
      }

      // Construir opciones de ordenamiento (lógica de negocio)
      let sortOption = undefined;
      if (sort === "asc") sortOption = { price: 1 };
      if (sort === "desc") sortOption = { price: -1 };

      // Llamar al repository con filtros y opciones ya procesadas
      const result = await productsRepository.getProducts(filter, {
        limit,
        page,
        sort: sortOption
      });

      // Retornar resultado con metadata de paginación
      return {
        ...result,
        limit,
        page,
        sort: sort || undefined,
        query: query || undefined
      };
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
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

  async getProductById(id) {
    try {
      const product = await productsRepository.getProductById(id);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  }
}

export default new ProductsService();
