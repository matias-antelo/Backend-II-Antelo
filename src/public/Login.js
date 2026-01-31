document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const btnRegister = document.getElementById("btn-register");

  if (!form || !btnRegister) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email")?.value?.trim();
    const password = document.getElementById("password")?.value?.trim();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos",
        confirmButtonColor: "#636160"
      });
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton?.textContent;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Iniciando sesión...";
    }

    try {
      const response = await fetch("/api/sessions/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", 
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: "Sesión iniciada correctamente",
          timer: 1500,
          showConfirmButton: false,
          confirmButtonColor: "#636160"
        }).then(() => {
          window.location.href = "/api/sessions/";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: data.message || "Email o contraseña inválidos",
          confirmButtonColor: "#636160"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text: "Email o contraseña inválidos.",
        confirmButtonColor: "#636160"
      });
    } finally {
      // Rehabilitar botón
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });

  btnRegister.addEventListener("click", () => {
    window.location.href = "/api/sessions/registration";
  });
});


