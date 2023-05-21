const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const utils = require("../utils/index"); // Asegúrate de que la ruta sea correcta

function getProducts() {
  const productsFilePath = path.join(__dirname, "../data/products.json");
  return utils.readJsonFile(productsFilePath);
}

function getProductById(id) {
  const products = getProducts();
  return products.find((p) => p.id === Number(id));
}

function getCarts() {
  const cartsFilePath = path.join(__dirname, "../data/carts.json");
  return utils.readJsonFile(cartsFilePath);
}

function getCartById(id) {
  const carts = getCarts();
  return carts.find((c) => c.id === Number(id));
}

function createCart() {
  const cartsFilePath = path.join(__dirname, "../data/carts.json");
  const carts = utils.readJsonFile(cartsFilePath);
  const newCart = {
    id: utils.generateId(),
    products: [],
  };
  carts.push(newCart);
  utils.writeJsonFile(cartsFilePath, carts);
  return newCart;
}

function updateCart(cart) {
  const cartsFilePath = path.join(__dirname, "../data/carts.json");
  const carts = utils.readJsonFile(cartsFilePath);
  const cartIndex = carts.findIndex((c) => c.id === cart.id);
  if (cartIndex !== -1) {
    carts[cartIndex] = cart;
    utils.writeJsonFile(cartsFilePath, carts);
  }
}

function deleteCart(id) {
  const cartsFilePath = path.join(__dirname, "../data/carts.json");
  const carts = utils.readJsonFile(cartsFilePath);
  const cartIndex = carts.findIndex((c) => c.id === Number(id));
  if (cartIndex !== -1) {
    carts.splice(cartIndex, 1);
    utils.writeJsonFile(cartsFilePath, carts);
  }
}

function validateCart(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  getProducts,
  getProductById,
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
  validateCart,
};
