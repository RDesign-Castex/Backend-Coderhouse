// Ejemplo de datos de productos
const products = [
  { id: 1, name: "Product 1", price: 9.99 },
  { id: 2, name: "Product 2", price: 19.99 },
];

exports.getAllProducts = (req, res) => {
  res.json(products);
};

exports.getProductById = (req, res) => {
  const product = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
};

exports.createProduct = (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
  const product = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  product.name = req.body.name;
  product.price = req.body.price;
  res.json(product);
};

exports.deleteProduct = (req, res) => {
  const index = products.findIndex(
    (product) => product.id === parseInt(req.params.id)
  );
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products.splice(index, 1);
  res.status(204).send();
};
exports.getProducts = (req, res) => {
  
  res.send(/* Tu lista de productos */);
};
