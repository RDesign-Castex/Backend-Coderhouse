const express = require('express');
const { body, validationResult } = require('express-validator');
const { readJsonFile, writeJsonFile, generateId } = require('../utils/fileManager');

const router = express.Router();

router.get('/', (req, res) => {
  const carts = readJsonFile('../data/carts.json');
  res.json(carts);
});

router.get('/:cid', (req, res, next) => {
  const carts = readJsonFile('../data/carts.json');
  const cart = carts.find(c => c.id === Number(req.params.cid));
  if (!cart) {
    const err = new Error('Cart not found');
    err.status = 404;
    return next(err);
  }
  res.json(cart);
});

router.post('/', (req, res) => {
  const carts = readJsonFile('../data/carts.json');
  const newCart = {
    id: generateId(),
    products: [],
  };
  carts.push(newCart);
  writeJsonFile('../data/carts.json', carts);
  res.status(201).json(newCart);
});

router.post('/:cid/product/:pid',
  body('quantity').isNumeric().withMessage('Quantity must be a number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const carts = readJsonFile('../data/carts.json');
    const cartIndex = carts.findIndex(c => c.id === Number(req.params.cid));
    if (cartIndex === -1) {
      const err = new Error('Cart not found');
      err.status = 404;
      return next(err);
    }
    const product = {
      product: Number(req.params.pid),
      quantity: Number(req.body.quantity),
    };
    carts[cartIndex].products.push(product);
    writeJsonFile('../data/carts.json', carts);
    res.json(carts[cartIndex]);
  }
);

router.put('/:cid', (req, res, next) => {
  const carts = readJsonFile('../data/carts.json');
  const cartIndex = carts.findIndex(c => c.id === Number(req.params.cid));
  if (cartIndex === -1) {
    const err = new Error('Cart not found');
    err.status = 404;
    return next(err);
  }
  const updatedCart = { ...carts[cartIndex], ...req.body };
  carts[cartIndex] = updatedCart;
  writeJsonFile('../data/carts.json', carts);
  res.json(updatedCart);
});

router.delete('/:cid', (req, res, next) => {
  const carts = readJsonFile('../data/carts.json');
  const cartIndex = carts.findIndex(c => c.id === Number(req.params.cid));
  if (cartIndex === -1) {
    const err = new Error('Cart not found');
    err.status = 404;
    return next(err);
  }
  carts.splice(cartIndex, 1);
  writeJsonFile('../data/carts.json', carts);
  res.json({ message: 'Cart deleted' });
});


module.exports = router;
