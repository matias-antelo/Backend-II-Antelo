import { ticketsDAO } from "../dao/index.js";

class TicketsRepository {
  async createTicket(data) {
    return await ticketsDAO.create(data);
  }

  async getTicketById(id) {
    return await ticketsDAO.getById(id);
  }

  async getTicketsByUser(email) {
    return await ticketsDAO.getByPurchaser(email);
  }
}

export default new TicketsRepository();
