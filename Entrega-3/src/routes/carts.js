const express = require('express');
const router = express.Router();
const CartManager = require('../classes/CartManager');

const cartManager = new CartManager('./data/carts.json');

// GET all carts
router.get('/', (req, res) => {
  try {
    const carts = cartManager.getCarts();
    res.json(carts);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// POST a new cart
router.post('/', (req, res) => {
  try {
    const cart = cartManager.addToCart(req.body);
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// PUT - update a cart
router.put('/:id', (req, res) => {
  try {
    const updatedCart = cartManager.updateCart(parseInt(req.params.id), req.body);
    res.json(updatedCart);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// DELETE a cart
router.delete('/:id', (req, res) => {
  try {
    cartManager.deleteFromCart(parseInt(req.params.id));
    res.status(204).send();
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

module.exports = router;
