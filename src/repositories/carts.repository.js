import { cartsDAO } from "../dao/index.js";

class CartsRepository {
  async getCartById(id) {
    return await cartsDAO.getByUserCart(id);
  }

  async createCart(data) {
    return await cartsDAO.create(data);
  }

  async updateCart(id, data) {
    return await cartsDAO.update(id, data);
  }

  async getCartByIdAndPopulate(id) {
    return await cartsDAO.getById(id);
  }
}

export default new CartsRepository();
