import ticketsRepository from "../repositories/tickets.repository.js";

class TicketsService {
  async getTicketsByUser(email) {
    try {
      const tickets = await ticketsRepository.getTicketsByUser(email);
      return tickets;
    } catch (error) {
      throw new Error(`Error al obtener tickets del usuario: ${error.message}`);
    }
  }

  async getTicketById(id) {
    try {
      const ticket = await ticketsRepository.getTicketById(id);
      if (!ticket) {
        throw new Error("Ticket no encontrado");
      }
      return ticket;
    } catch (error) {
      throw new Error(`Error al obtener ticket: ${error.message}`);
    }
  }
}

export default new TicketsService();
