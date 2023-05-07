const express = require('express');
const router = express.Router();
const cartsController = require('./carts.controllers');

router.get('/', cartsController.getAllCarts);
router.get('/:id', cartsController.getCartById);
router.post('/', cartsController.createCart);
router.put('/:id', cartsController.updateCart);
router.delete('/:id', cartsController.deleteCart);
router.post('/add-product', cartsController.addProductToCart);

module.exports = router;
