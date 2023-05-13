const express = require('express');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(productRoutes);
app.use(cartRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
