import cartsModel from "../../model/carts.model.js";

export default class CartsDAO {
  getById(id) {
    return cartsModel.findById(id).populate("products.product");
  }

  getByUserCart(cartId) {
    return cartsModel.findById(cartId).populate("products.product");
  }

  create(data) {
    return cartsModel.create(data);
  }

  update(id, data) {
    return cartsModel.findByIdAndUpdate(id, data, { new: true });
  }
}
