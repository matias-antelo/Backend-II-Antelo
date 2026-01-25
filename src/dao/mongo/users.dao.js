import usersModel from "../../model/users.model.js";

export default class UsersDAO {
  getByEmail(email) {
    return usersModel.findOne({ email });
  }

  getById(id) {
    return usersModel.findById(id).populate("cart");
  }

  create(user) {
    return usersModel.create(user);
  }

  update(id, data) {
    return usersModel.findByIdAndUpdate(id, data, { new: true });
  }
}