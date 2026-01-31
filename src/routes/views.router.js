import { Router } from 'express';
import productsController from "../controllers/products.controller.js";
import cartsController from "../controllers/carts.controller.js";
import usersController from "../controllers/users.controller.js";
import { authJWT, redirectAuth } from "../middlewares/auth.middleware.js";

const router = Router();

//Ruta de inicio de sesión
router.get('/login', redirectAuth, usersController.renderLogin.bind(usersController));

//Ruta de registro usuarios
router.get('/registration', redirectAuth, usersController.renderRegistration.bind(usersController));

//Ruta de productos
router.get("/", authJWT, productsController.renderHome.bind(productsController));

//Ruta de carritos
router.get("/carts", authJWT, cartsController.renderCart.bind(cartsController));

export default router;