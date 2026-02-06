import ticketsService from "../services/tickets.service.js";

class TicketsController {
  async renderTickets(req, res) {
    try {
      const user = req.user;
      const tickets = await ticketsService.getTicketsByUser(user.email);

      res.render("tickets", {
        title: "Mis Tickets",
        tickets: tickets || []
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al cargar tickets");
    }
  }

  async renderTicketDetail(req, res) {
    try {
      const { id } = req.params;
      const ticket = await ticketsService.getTicketById(id);

      res.render("ticketDetalle", {
        title: "Detalle de Ticket",
        ticket
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al cargar detalle del ticket");
    }
  }
}

export default new TicketsController();