import productsService from "../services/products.service.js";

class ProductsController {
  async getAll(req, res) {
    try {
      const queryParams = req.query;
      const result = await productsService.getProductsFromQuery(queryParams);

      res.json({
        status: "success",
        ...result
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al obtener productos",
        error: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await productsService.getProductById(id);

      if (!product) {
        return res.status(404).json({
          status: "error",
          message: "Producto no encontrado"
        });
      }

      res.json({
        status: "success",
        product
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al obtener producto",
        error: error.message
      });
    }
  }

  async create(req, res) {
    try {
      const { title, price, description, stock, category, available } = req.body;

      if (!title || !price || !category) {
        return res.status(400).json({
          status: "error",
          message: "Faltan campos obligatorios"
        });
      }

      const product = await productsService.createProduct({
        title,
        price,
        description,
        stock: stock || 0,
        category,
        available: available !== undefined ? available : true
      });

      res.status(201).json({
        status: "success",
        message: "Producto creado correctamente",
        product
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al crear producto",
        error: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const product = await productsService.updateProduct(id, data);

      if (!product) {
        return res.status(404).json({
          status: "error",
          message: "Producto no encontrado"
        });
      }

      res.json({
        status: "success",
        message: "Producto actualizado correctamente",
        product
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al actualizar producto",
        error: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await productsService.deleteProduct(id);

      if (!product) {
        return res.status(404).json({
          status: "error",
          message: "Producto no encontrado"
        });
      }

      res.json({
        status: "success",
        message: "Producto eliminado correctamente"
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al eliminar producto",
        error: error.message
      });
    }
  }
}

export default new ProductsController();
