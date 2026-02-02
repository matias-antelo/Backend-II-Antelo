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

  getByResetToken(token) {
    return usersModel.findOne({ 
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }
    });
  }

  updateResetToken(id, token, expiresIn) {
    return usersModel.findByIdAndUpdate(id, {
      resetPasswordToken: token,
      resetPasswordExpires: new Date(Date.now() + expiresIn)
    }, { new: true });
  }

  clearResetToken(id) {
    return usersModel.findByIdAndUpdate(id, {
      resetPasswordToken: null,
      resetPasswordExpires: null
    }, { new: true });
  }
}