const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../../data/products.json");

const getProducts = () => {
  const productsData = fs.readFileSync(productsFilePath);
  return JSON.parse(productsData);
};

const getProductById = (id) => {
  const products = getProducts();
  return products.find((product) => String(product.id) === String(id));
};

const generateId = (products) => {
  if (products.length === 0) {
    return 1;
  }
  const maxId = products.reduce((max, product) => Math.max(max, product.id), 0);
  return maxId + 1;
};

const createProduct = (newProduct) => {
  const products = getProducts();
  newProduct.id = generateId(products);
  products.push(newProduct);
  fs.writeFileSync(productsFilePath, JSON.stringify(products));
  return newProduct;
};

const updateProduct = (id, updatedProductData) => {
  const products = getProducts();
  const productIndex = products.findIndex(
    (product) => String(product.id) === String(id)
  );
  if (productIndex === -1) {
    return null;
  }

  const updatedProduct = { ...products[productIndex], ...updatedProductData };
  products[productIndex] = updatedProduct;
  fs.writeFileSync(productsFilePath, JSON.stringify(products));
  return updatedProduct;
};

const deleteProduct = (productId) => {
  const products = getProducts();
  const productIndex = products.findIndex(
    (product) => String(product.id) === String(productId)
  );

  if (productIndex === -1) {
    return null;
  }

  products.splice(productIndex, 1);
  fs.writeFileSync(productsFilePath, JSON.stringify(products));
  return true;
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
