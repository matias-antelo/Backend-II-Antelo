import { cartsDAO } from "../dao/index.js";

class CartsRepository {
  async getCartById(id, populate = false) {
    if (populate) {
      return await cartsDAO.getById(id);
    }
    return await cartsDAO.getByIdWithoutPopulate(id);
  }

  async createCart(data) {
    return await cartsDAO.create(data);
  }

  async updateCart(id, data) {
    return await cartsDAO.update(id, data);
  }
}

export default new CartsRepository();
