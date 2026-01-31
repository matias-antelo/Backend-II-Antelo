document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", async () => {
    const result = await Swal.fire({
      title: "¿Cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#636160"
    });

    if (result.isConfirmed) {
      logoutBtn.disabled = true;
      const originalText = logoutBtn.textContent;
      logoutBtn.textContent = "Cerrando sesión...";

      try {
        const response = await fetch("/api/sessions/logout", {
          method: "POST",
          credentials: "include" // 🔐 Necesario para enviar cookies JWT
        });

        const data = await response.json();

        if (response.ok && data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Sesión cerrada",
            text: "Has cerrado sesión correctamente",
            timer: 1500,
            showConfirmButton: false
          });

          setTimeout(() => {
            window.location.href = "/api/sessions/login";
          }, 1500);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al cerrar sesión",
            text: data.message || "Inténtalo de nuevo",
            confirmButtonColor: "#636160"
          });
          logoutBtn.disabled = false;
          logoutBtn.textContent = originalText;
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No se pudo conectar con el servidor",
          confirmButtonColor: "#636160"
        });
        logoutBtn.disabled = false;
        logoutBtn.textContent = originalText;
      }
    }
  });
});