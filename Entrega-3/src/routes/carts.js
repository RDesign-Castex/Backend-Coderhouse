const express = require("express");
const router = express.Router();
const CartManager = require("../classes/CartManager");

const cartManager = new CartManager("./data/carts.json");

// GET all carts
router.get("/", (req, res) => {
  try {
    const carts = cartManager.getCarts();
    res.json(carts);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET a cart by ID
router.get("/:id", (req, res) => {
  const cartId = req.params.id;
  try {
    const cart = cartManager.getCartById(cartId);
    res.json(cart);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

// POST a new cart
router.post("/", (req, res) => {
  try {
    const cart = cartManager.addToCart(req.body);
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// PUT - update a cart
router.put("/:id", (req, res) => {
  const cartId = parseInt(req.params.id);
  try {
    const updatedCart = cartManager.updateCart(cartId, req.body);
    res.json(updatedCart);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// DELETE a cart
router.delete("/:id", (req, res) => {
  const cartId = parseInt(req.params.id);
  try {
    cartManager.deleteCart(cartId);
    res.status(204).send({ message: "Cart deleted successfully" });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

module.exports = router;
