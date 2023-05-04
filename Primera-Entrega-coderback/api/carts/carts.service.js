const fs = require("fs");
const path = require("path");
const { getProductById } = require("../products/products.service");

const cartsFilePath = path.join(__dirname, "../../data/carts.json");

const getCarts = () => {
  const cartsData = fs.readFileSync(cartsFilePath);
  return JSON.parse(cartsData);
};

const getCartById = (id) => {
  const carts = getCarts();
  return carts.find((cart) => cart.id === id);
};

const createCart = (newCart) => {
  const carts = getCarts();
  newCart.id = generateId(carts);
  newCart.products = [];
	carts.push(newCart);
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts));
  return newCart;
};

const addProductToCart = (cartId, productId) => {
  const carts = getCarts();
  const cart = getCartById(cartId);

  if (!cart) {
    return null;
  }

  const productInCart = cart.products.find((product) => product.id === productId);

  if (productInCart) {
    productInCart.quantity++;
  } else {
    const newProduct = { id: productId, quantity: 1 };
    cart.products.push(newProduct);
  }

  const cartIndex = carts.findIndex((cart) => cart.id === cartId);
  carts[cartIndex] = cart;
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts));

  return cart;
};

const generateId = (carts) => {
  const maxId = Math.max(...carts.map((cart) => cart.id));
  return maxId + 1;
};

module.exports = {
  getCartById,
  createCart,
  addProductToCart,
};
