import usersRepository from "../repositories/users.repository.js";
import cartsRepository from "../repositories/carts.repository.js";
import { createHash } from "../utils.js";
import UserDTO from "../dto/user.dto.js";

class UsersService {

  async registerUser(userData) {
    // 1️⃣ Validar si el usuario ya existe
    const existingUser = await usersRepository.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    // 2️⃣ Crear carrito para el usuario con cartNumber único
    const cartNumber = Date.now(); // Generar cartNumber único basado en timestamp
    const cart = await cartsRepository.createCart({
      cartNumber: cartNumber,
      products: []
    });

    // 3️⃣ Crear usuario
    const newUser = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      age: userData.age,
      password: createHash(userData.password),
      cart: cart._id,
      role: "user"
    };

    return await usersRepository.createUser(newUser);
  }

  async getUserByEmail(email) {
    return await usersRepository.getUserByEmail(email);
  }

  async getUserById(id) {
    return await usersRepository.getUserById(id);
  }

  async updateUser(id, data) {
    return await usersRepository.updateUser(id, data);
  }

  async getCurrentUser(id) {
    const user = await usersRepository.getUserById(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return UserDTO.from(user);
  }
}

export default new UsersService();
