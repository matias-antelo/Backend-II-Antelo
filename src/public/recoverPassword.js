document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recover-form");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;

            if (!email) {
                Swal.fire("Error", "Por favor ingresa tu email", "error");
                return;
            }

            try {
                const response = await fetch("/api/sessions/request-reset", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (response.ok) {
                    Swal.fire({
                        title: "Éxito",
                        text: "Se ha enviado un correo para recuperar tu contraseña",
                        icon: "success",
                        timer: 3000,
                        showConfirmButton: false
                    }).then(() => {
                        setTimeout(() => {
                            window.location.href = "/api/sessions/login";
                        }, 1000);
                    });
                } else {
                    Swal.fire("Error", data.error || "Error al solicitar recuperación", "error");
                }
            } catch (error) {
                console.error("Error:", error);
                Swal.fire("Error", "Error de conexión con el servidor", "error");
            }
        });
    }
});