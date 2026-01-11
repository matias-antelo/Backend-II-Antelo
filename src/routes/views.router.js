import { Router } from 'express';
import productsModel from "../model/products.model.js";
import cartsModel from '../model/carts.model.js';
import { authJWT } from "../middlewares/auth.middleware.js";
import { redirectAuth } from "../middlewares/auth.middleware.js";

const router = Router();

//Ruta de inicio de sesión
router.get('/login', redirectAuth, (req, res) => {
  res.render('login', {
    title: "LOGGIN",
  })
});

//Ruta de registro usuarios
router.get('/registration', redirectAuth, (req, res) => {
  res.render('registration', {
    title: "Registro",
  })
});


//Ruta de productos con paginación, filtro y ordenamiento
router.get("/", authJWT, async (req, res) => {
  let { limit, page, sort, query } = req.query;

  limit = parseInt(limit) || 10;
  page = parseInt(page) || 1;
  const filter = {};
  if (query) {
    filter.category = query;
  }
  const sortOption = {};
  if (sort === "asc") sortOption.price = 1;
  if (sort === "desc") sortOption.price = -1;

  const result = await productsModel.paginate(filter, {
    limit,
    page,
    sort: sortOption,
    lean: true
  });

  const baseUrl = req.baseUrl;
  const pages = [];
  for (let i = 1; i <= result.totalPages; i++) {
    pages.push({
      number: i,
      active: i === result.page,
      link: `${baseUrl}/?page=${i}&limit=${limit}&sort=${sort || ""}&query=${query || ""}`
    });
  }

  return res.render("home", {
    title: "Productos almacenados",
    products: result.docs,
    currentQuery: query || "",
    currentLimit: limit,
    currentSort: sort || "",
    pages,
    currentPage: result.page,
  });
});

//Ruta de carritos
router.get("/carts", authJWT, async (req, res) => {

  const carts = await cartsModel.find().lean();
  const productsList = await productsModel.find().lean();
  const defaultCart = await cartsModel

    .findOne({ cartNumber: 1 })
    .populate("products.product")
    .lean();

  res.render("carts", {
    title: "Carrito",
    carts,
    products: defaultCart ? defaultCart.products : [],
    cartNumber: 1,
    productsList
  });
});

export default router;