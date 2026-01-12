document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-agregar").forEach(btn => {
    btn.addEventListener("click", async () => {
      const productId = btn.dataset.id;

      const res = await fetch(`/api/carts/products/${productId}`, {
        method: "POST",
        credentials: "include" // 🔐 JWT
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Agregado", data.message, "success");
      } else {
        Swal.fire("Error", data.error || "Error", "error");
      }
    });
  });
});
