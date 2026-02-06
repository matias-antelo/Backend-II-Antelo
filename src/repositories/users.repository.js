import { usersDAO } from "../dao/index.js";

class UsersRepository {
  async getUserByEmail(email) {
    return await usersDAO.getByEmail(email);
  }

  async getUserById(id) {
    return await usersDAO.getById(id);
  }

  async createUser(data) {
    return await usersDAO.create(data);
  }

  async updateUser(id, data) {
    return await usersDAO.update(id, data);
  }

  async getUserByResetToken(token) {
    return await usersDAO.getByResetToken(token);
  }

  async updateResetToken(id, token, expiresIn) {
    return await usersDAO.updateResetToken(id, token, expiresIn);
  }

  async clearResetToken(id) {
    return await usersDAO.clearResetToken(id);
  }
}

export default new UsersRepository();