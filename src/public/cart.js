document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-agregar").forEach(btn => {
    btn.addEventListener("click", async () => {
      const productId = btn.dataset.id;

      if (!productId) {
        Swal.fire("Error", "ID del producto no encontrado", "error");
        return;
      }

      try {
        const res = await fetch(`/api/carts/products/${productId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include" 
        });

        const data = await res.json();

        if (res.ok) {
          Swal.fire({
            title: "Éxito",
            text: data.message || "Producto agregado al carrito",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
        } else {
          Swal.fire("Error", data.message || data.error || "Error al agregar producto", "error");
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error", "Error de conexión con el servidor", "error");
      }
    });
  });

  const deleteButtons = document.querySelectorAll(".btn-delete-product");

  deleteButtons.forEach(button => {
    button.addEventListener("click", async () => {
      const productId = button.dataset.productId;

      try {
        const response = await fetch(
          `/api/carts/products/${productId}`,
          {
            method: "DELETE",
            credentials: "include"
          }
        );

        const result = await response.json();

        if (result.status === "success") {
        
          window.location.reload();
        } else {
          alert(result.message || "Error al eliminar producto");
        }
      } catch (error) {
        console.error(error);
        alert("Error al eliminar producto del carrito");
      }
    });
  });
});
