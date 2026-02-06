import { productsDAO } from "../dao/index.js";

class ProductsRepository {
  async getProducts(filter = {}, options = {}) {
    const result = await productsDAO.getAll(filter, {
      ...options, lean: true
    });
    return result;
  }

  async createProduct(product) {
    return await productsDAO.create(product);
  }

  async updateProduct(id, data) {
    return await productsDAO.update(id, data);
  }

  async decrementStockIfAvailable(id, qty) {
    return await productsDAO.decrementStockIfAvailable(id, qty);
  }

  async deleteProduct(id) {
    return await productsDAO.delete(id);
  }

  async getProductById(id) {
    return await productsDAO.getById(id);
  }
}

export default new ProductsRepository();