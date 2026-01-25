document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-producto");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    const firstName = document.getElementById("first_name")?.value?.trim();
    const lastName = document.getElementById("last_name")?.value?.trim();
    const email = document.getElementById("email")?.value?.trim();
    const age = document.getElementById("age")?.value?.trim();
    const password = document.getElementById("password")?.value?.trim();

    if (!firstName || !lastName || !email || !age || !password) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    const user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      age: Number(age),
      password: password,
    };

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      
      if (res.ok) {
        Swal.fire({
          title: "Éxito",
          text: data.message || "Usuario registrado correctamente",
          icon: "success",
          confirmButtonText: "Continuar"
        }).then(() => {
          window.location.href = "/api/sessions/login";
        });
      } else {
        Swal.fire("Error", data.message || "Error al registrar usuario", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Error de conexión con el servidor", "error");
    }
  });
});


