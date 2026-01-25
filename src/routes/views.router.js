import { Router } from 'express';
import productsRepository from "../repositories/products.repository.js";
import cartsModel from '../model/carts.model.js';
import { authJWT } from "../middlewares/auth.middleware.js";
import { redirectAuth } from "../middlewares/auth.middleware.js";

const router = Router();

//Ruta de inicio de sesión
router.get('/login', redirectAuth, (req, res) => {
  res.render('login', { title: "LOGGIN", })
});

//Ruta de registro usuarios
router.get('/registration', redirectAuth, (req, res) => {
  res.render('registration', { title: "Registro", })
});

//Ruta de productos con paginación, filtro y ordenamiento
router.get("/", authJWT, async (req, res) => {
  try {
    const result = await productsRepository.getProductsFromQuery(req.query);

    const baseUrl = req.baseUrl;
    const pages = [];

    for (let i = 1; i <= result.totalPages; i++) {
      pages.push({
        number: i,
        active: i === result.page,
        link: `${baseUrl}/?page=${i}&limit=${result.limit}&sort=${result.sort || ""}&query=${result.query || ""}`
      });
    }

    res.render("home", {
      title: "Productos almacenados",
      products: result.docs,
      currentQuery: result.query || "",
      currentLimit: result.limit,
      currentSort: result.sort || "",
      pages,
      currentPage: result.page
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar productos");
  }
});

//Ruta de carritos
router.get("/carts", authJWT, async (req, res) => {
  const cart = await cartsModel
    .findById(req.user.cart)
    .populate("products.product")
    .lean();

  res.render("carts", {
    title: "Mi carrito",
    products: cart ? cart.products : []
  });
});

export default router;