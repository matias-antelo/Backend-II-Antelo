document.querySelectorAll('.btn-ver-detalle').forEach(btn => {
    btn.addEventListener('click', function() {
      const ticketId = this.getAttribute('data-ticket-id');
      window.location.href = `/api/sessions/ticket/${ticketId}`;
    });
  });