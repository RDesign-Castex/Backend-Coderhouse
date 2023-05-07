const express = require('express');
const router = express.Router();
const controllers = require('./controllers');
const cartsRoutes = require('./carts/carts.routes');
const productsRoutes = require('./products/products.routes');
const usersRoutes = require('./users/users.routes');

router.get('/', controllers.index);
router.use('/carts', cartsRoutes);
router.use('/products', productsRoutes);
router.use('/users', usersRoutes);

module.exports = router;
