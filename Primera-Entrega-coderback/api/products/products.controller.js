const productsService = require("./products.service");

exports.getProducts = (req, res) => {
  const products = productsService.getProducts();
  res.send({ status: "success", payload: products });
};

exports.getProductById = (req, res) => {
  const productId = req.params.pid;
  const product = productsService.getProductById(productId);

  if (!product) {
    return res
      .status(400)
      .send({ status: "error", error: "Product not found" });
  }
  res.send({ status: "success", payload: product });
};

exports.createProduct = (req, res) => {
  const newProduct = req.body;
  const createdProduct = productsService.createProduct(newProduct);

  if (!createdProduct) {
    return res
      .status(400)
      .send({ status: "error", error: "Product creation failed" });
  }
  res.send({ status: "success", payload: createdProduct });
};

exports.updateProduct = (req, res) => {
  const productId = req.params.pid;
  const updatedProductData = req.body;
  const updatedProduct = productsService.updateProduct(
    productId,
    updatedProductData
  );

  if (!updatedProduct) {
    return res
      .status(400)
      .send({ status: "error", error: "Product update failed" });
  }
  res.send({ status: "success", payload: updatedProduct });
};

exports.deleteProduct = (req, res) => {
  const productId = req.params.pid;
  const deletedProduct = productsService.deleteProduct(productId);

  if (!deletedProduct) {
    return res
      .status(404)
      .json({ status: "error", error: "Producto no encontrado." });
  }

  res.json({ status: "success", message: "Producto eliminado correctamente." });
};
