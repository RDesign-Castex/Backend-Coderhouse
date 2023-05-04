const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../../data/products.json");

const getProducts = () => {
  const productsData = fs.readFileSync(productsFilePath);
  return JSON.parse(productsData);
};

const getProductById = (id) => {
  const products = getProducts();
  return products.find((product) => product.id === id);
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
  const productIndex = products.findIndex((product) => product.id === id);
if (productIndex === -1) {
	return null;
}

const updatedProduct = { ...products[productIndex], ...updatedProductData };
products[productIndex] = updatedProduct;
fs.writeFileSync(productsFilePath, JSON.stringify(products));
return updatedProduct;
};

const deleteProduct = (id) => {
const products = getProducts();
const productIndex = products.findIndex((product) => product.id === id);

if (productIndex === -1) {
	return null;
}

const deletedProduct = products.splice(productIndex, 1);
fs.writeFileSync(productsFilePath, JSON.stringify(products));
return deletedProduct;
};

const generateId = (products) => {
const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
return maxId + 1;
};

module.exports = {
getProducts,
getProductById,
createProduct,
updateProduct,
deleteProduct,
};
