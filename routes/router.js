const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const utils = require("../utils/function");
const productService = require("../services/productService");
const chatbotService = require("../services/chatbot");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/chatbot", (req, res) => {
  res.render("chatbot");
});

router.post("/chatbot", (req, res) => {
  const userMessage = req.body.message;
  const botResponse = chatbotService.generateBotResponse(userMessage);
  res.json({ response: botResponse });
});

router.get("/products", (req, res) => {
  const products = productService.getProducts();
  res.render("products", { products });
});

router.get("/products/:pid", (req, res) => {
  const productId = req.params.pid;
  const product = productService.getProductById(productId);
  if (product) {
    res.render("product-details", { product: product });
  } else {
    res.render("product-not-found");
  }
});

router.get("/realtimeproducts", (req, res) => {
  const products = productService.getProducts();
  res.render("realtimeproducts", { products });
});

router.get("/new_product", (req, res) => {
  res.render("new_product");
});

router.post(
  "/api/products",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("code").notEmpty().withMessage("Code is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("status").notEmpty().withMessage("Status is required"),
    body("stock").isNumeric().withMessage("Stock must be a number"),
    body("category").notEmpty().withMessage("Category is required"),
    body("thumbnail").notEmpty().withMessage("Thumbnail is required"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = req.body;

    const newProduct = {
      id: utils.generateId(),
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    };

    const products = utils.readJsonFile(productsFilePath);
    products.push(newProduct);
    utils.writeJsonFile(productsFilePath, products);

    res.redirect("/products");
  }
);

router.get("/carts", (req, res) => {
  const carts = productService.getCarts();
  return res.json(carts);
});

router.get("/carts/:cid", (req, res) => {
  const cart = productService.getCartById(req.params.cid);
  if (!cart) {
    res.status(404).json({ message: "Cart not found" });
  } else {
    res.json(cart);
  }
});

router.post("/carts", (req, res) => {
  const newCart = productService.createCart();
  res.status(201).json(newCart);
});

router.post(
  "/carts/:cid/products/:pid",
  [body("quantity").isNumeric().withMessage("Quantity must be a number")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    const message = productService.addProductToCart(
      cartId,
      productId,
      quantity
    );
    res.json({ message: message });
  }
);

router.put("/carts/:cid", (req, res) => {
  const updatedCart = productService.updateCart(req.params.cid, req.body);
  if (!updatedCart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  res.json(updatedCart);
});

router.delete("/carts/:cid", (req, res) => {
  const message = productService.deleteCart(req.params.cid);
  if (!message) {
    return res.status(404).json({ message: "Cart not found" });
  }
  res.json({ message: message });
});

module.exports = router;
