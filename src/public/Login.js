document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("login-form");
  const btnRegister = document.getElementById("btn-register");

  if (!form || !btnRegister) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/sessions/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok && data.status === "success") {
      window.location.href = "/api/sessions/";
    } else {
      Swal.fire({
        icon: "error",
        title: "Login incorrecto",
        text: "Email o contraseña inválidos",
        confirmButtonColor: "#636160"
      });
    }
  });

  btnRegister.addEventListener("click", () => {
    window.location.href = "/api/sessions/registration";
  });

});


