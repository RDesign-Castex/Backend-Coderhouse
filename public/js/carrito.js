
        // Obtener elementos del DOM
	const cartButton = document.getElementById("cartButton");
	const cartModal = document.getElementById("cartModal");
	const closeBtn = document.getElementsByClassName("close")[0];
	const cartItems = document.getElementById("cartItems");

	// Manejar evento de clic en el botón del carrito
	cartButton.addEventListener("click", function() {
		cartModal.style.display = "block"; // Mostrar ventana modal
        });

	// Manejar evento de clic en el botón de cerrar
	closeBtn.addEventListener("click", function() {
		cartModal.style.display = "none"; // Ocultar ventana modal
        });

	// Función para agregar un elemento al carrito
	function addToCart(item) {
            const listItem = document.createElement("li");
	listItem.className = "cart-item";
	listItem.innerHTML = `
	<img src="${item.image}" alt="${item.name}">
		<span class="item-name">${item.name}</span>
		<button class="remove-button" data-id="${item.id}">Eliminar</button>
		`;
		cartItems.appendChild(listItem);
        }

		// Función para eliminar un elemento del carrito
		function removeFromCart(itemId) {
            const item = document.querySelector(`.remove-button[data-id="${itemId}"]`).parentElement;
		item.remove();
        }

		// Ejemplo: Agregar elementos al carrito
		addToCart({id: 1, name: "Producto 1", image: "product1.jpg" });
		addToCart({id: 2, name: "Producto 2", image: "product2.jpg" });
		addToCart({id: 3, name: "Producto 3", image: "product3.jpg" });

		// Ejemplo: Eliminar elemento del carrito al hacer clic en el botón "Eliminar"
		document.addEventListener("click", function(event) {
            if (event.target.classList.contains("remove-button")) {
                const itemId = event.target.dataset.id;
		removeFromCart(itemId);
            }
        });
