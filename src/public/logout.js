const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
  const result = await Swal.fire({
    title: "¿Cerrar sesión?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, salir",
    cancelButtonText: "Cancelar"
  });

  if (result.isConfirmed) {
    try {
      await fetch("/api/sessions/logout", { method: "POST" });

      Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(() => {
        window.location.href = "/api/sessions/login";
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cerrar sesión",
        text: "Inténtalo de nuevo"
      });
    }
  }
});