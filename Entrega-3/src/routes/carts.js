const express = require('express');
const CartManager = require('../classes/cartManager');
const router = express.Router();
const cartManager = new CartManager('./data/carts.json');

router.get('/api/carts', async (req, res) => {
  const carts = await cartManager.getCarts();
  res.json({
    success: true,
    response: carts,
  });
});

router.get('/api/carts/:cid', async (req, res) => {
  const cid = parseInt(req.params.cid);
  const cart = await cartManager.getCartById(cid);
  res.json({
    success: true,
    response: cart,
  });
});

module.exports = router;
