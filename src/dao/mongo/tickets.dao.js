import ticketsModel from "../../model/ticket.model.js";

export default class TicketsDAO {
  async create(ticket) {
    return ticketsModel.create(ticket);
  }

  async getById(id) {
    return ticketsModel.findById(id).populate({
      path: "products.product"
    }).lean();
  }

  async getByPurchaser(email) {
    return ticketsModel.find({ purchaser: email }).populate({
      path: "products.product"
    }).lean();
  }
}