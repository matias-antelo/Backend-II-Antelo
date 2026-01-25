import UsersDAO from "./mongo/users.dao.js";
import ProductsDAO from "./mongo/products.dao.js";
import CartsDAO from "./mongo/carts.dao.js";

export const usersDAO = new UsersDAO();
export const productsDAO = new ProductsDAO();
export const cartsDAO = new CartsDAO();