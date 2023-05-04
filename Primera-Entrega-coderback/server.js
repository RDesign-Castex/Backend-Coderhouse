const express = require("express");
const app = express();
const productsRoutes = require("./api/products/products.routes");
const cartsRoutes = require("./api/carts/carts.routes");

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
