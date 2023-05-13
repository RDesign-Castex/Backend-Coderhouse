const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
