const express = require('express');
const productsRouter = require('./api/products');
const cartsRouter = require('./api/carts');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use(errorHandler);

module.exports = app;
