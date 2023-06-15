// navbar.js
document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.querySelector(".navbar");

  // Agregar el contenido del navbar
  navbar.innerHTML = `
    <a class="brand" href="#">Mi <span>Servidor</span></a>
    <a href="/products">Products</a>
    <a href="/new_product">New Product</a>
    <a href="/chatbot">Chat</a>
    <button id="cartButton">Carrito</button>
  `;

  // Agregar la clase "active" al elemento del navbar correspondiente a la página actual
  const currentPage = window.location.pathname;
  const navbarLinks = navbar.querySelectorAll("a");
  navbarLinks.forEach(function(link) {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // Lógica adicional del navbar
  // ...
});
