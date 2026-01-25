import { productsDAO } from "../dao/index.js";

class ProductsRepository {
  async getProductsFromQuery(queryParams) {
    let { limit, page, sort, query } = queryParams;

    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;

    const filter = {};
    if (query) {
      filter.category = query;
    }

    let sortOption = undefined;
    if (sort === "asc") sortOption = { price: 1 };
    if (sort === "desc") sortOption = { price: -1 };

    const result = await productsDAO.getAll(filter, {
      limit,
      page,
      sort: sortOption,
      lean: true
    });

    return {
      ...result,
      limit,
      page,
      sort,
      query
    };
  }

  async getProductById(id) {
    return await productsDAO.getById(id);
  }

  async createProduct(product) {
    return await productsDAO.create(product);
  }

  async updateProduct(id, data) {
    return await productsDAO.update(id, data);
  }

  async deleteProduct(id) {
    return await productsDAO.delete(id);
  }
}

export default new ProductsRepository();