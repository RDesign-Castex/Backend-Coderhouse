const express = require("express");
const ProductManager = require("../classes/ProductManager");
const router = express.Router();
const productManager = new ProductManager();

// Endpoint para obtener todos los productos o una cantidad limitada de productos
router.get("/api/products", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  const products = await productManager.getProducts(limit);
  res.json(products);
});

// Endpoint para obtener un producto específico por IDnpm
router.get("/api/products/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = await productManager.getProductById(pid);
  res.json(product);
});

// Añadir más endpoints según sea necesario, por ejemplo, para agregar, actualizar o eliminar productos.

module.exports = router;
