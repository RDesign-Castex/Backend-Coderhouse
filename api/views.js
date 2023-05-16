const express = require("express");
const router = express.Router();
const path = require("path");
const { readJsonFile } = require("../utils/fileManager");

router.get("/", (req, res) => {
  const products = readJsonFile(path.join(__dirname, "../data/products.json"));
  res.render("index", { products });
});

router.get("/realtimeproducts", (req, res) => {
  const products = readJsonFile(path.join(__dirname, "../data/products.json"));
  res.render("realTimeProducts", { products });
});
router.get("/load-product", (req, res) => {
  res.render("load-product");
});
module.exports = router;
