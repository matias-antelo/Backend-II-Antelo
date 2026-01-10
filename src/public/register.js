document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-producto");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = {
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      email: document.getElementById("email").value,
      age: Number(document.getElementById("age").value),
      password: document.getElementById("password").value,
    };

    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (res.ok) {
      Swal.fire("Éxito", data.message, "success");
      window.location.href = "/api/sessions/login";
    } else {
      Swal.fire("Error", data.message, "error");
    }
  });
});


