const express = require("express");
const router = express.Router();
const ProductManager = require("../classes/ProductManager");

const productManager = new ProductManager("./data/data.json");

// GET all products
router.get("/", (req, res) => {
  try {
    const limit = parseInt(req.query.limit); // Captura el valor del parámetro limit
    let products = productManager.getProducts();

    if (!isNaN(limit)) {
      // Verifica si el valor de limit es un número válido
      products = products.slice(0, limit); // Limita la cantidad de productos según el valor de limit
    }

    res.json(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET a product by id
router.get("/:id", (req, res) => {
  try {
    const product = productManager.getProductById(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

// POST a new product
router.post("/", (req, res) => {
  try {
    const product = productManager.addProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// PUT - update a product
router.put("/:id", (req, res) => {
  try {
    const updatedProduct = productManager.updateProduct(
      parseInt(req.params.id),
      req.body
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// DELETE a product
router.delete("/:id", (req, res) => {
  try {
    productManager.deleteProduct(parseInt(req.params.id));
    res.status(204).send();
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

module.exports = router;
