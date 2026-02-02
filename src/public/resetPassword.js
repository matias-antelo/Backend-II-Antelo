document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reset-form");
  
  // Obtener token y userId de los inputs ocultos (si están presentes)
  const token = new URLSearchParams(window.location.search).get("token");
  const userId = new URLSearchParams(window.location.search).get("userId");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const password = document.getElementById("password").value;
      const passwordConfirm = document.getElementById("passwordConfirm").value;

      if (!password || !passwordConfirm) {
        Swal.fire("Error", "Por favor rellena todos los campos", "error");
        return;
      }

      if (password.length < 6) {
        Swal.fire("Error", "La contraseña debe tener al menos 6 caracteres", "error");
        return;
      }

      if (password !== passwordConfirm) {
        Swal.fire("Error", "Las contraseñas no coinciden", "error");
        return;
      }

      if (!token || !userId) {
        Swal.fire("Error", "Token o usuario inválido", "error");
        return;
      }

      try {
        const response = await fetch("/api/sessions/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token,
            userId,
            password,
            passwordConfirm
          })
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire({
            title: "Éxito",
            text: "Tu contraseña ha sido restablecida correctamente",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            setTimeout(() => {
              window.location.href = "/login";
            }, 500);
          });
        } else {
          Swal.fire("Error", data.error || "Error al restablecer contraseña", "error");
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error", "Error de conexión con el servidor", "error");
      }
    });
  }
});
