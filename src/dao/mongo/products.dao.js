import productsModel from "../../model/products.model.js";

export default class ProductsDAO {
  async getAll(filter = {}, options = {}) {
    return await productsModel.paginate(filter, options);
  }

  async getById(id) {
    return await productsModel.findById(id);
  }

  async create(product) {
    return await productsModel.create(product);
  }

  async update(id, data) {
    return await productsModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await productsModel.findByIdAndDelete(id);
  }
}