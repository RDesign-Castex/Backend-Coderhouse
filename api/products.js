const express = require("express");
const { validationResult } = require("express-validator");
const { body } = require("express-validator");

const {
  readJsonFile,
  writeJsonFile,
  generateId,
} = require("../utils/fileManager");

const router = express.Router();

router.get("/", (req, res) => {
  const products = readJsonFile("../data/products.json");
  res.json(products);
});

router.get("/:pid", (req, res, next) => {
  const products = readJsonFile("../data/products.json");
  const product = products.find((p) => p.id === Number(req.params.pid));
  if (!product) {
    const err = new Error("Product not found");
    err.status = 404;
    return next(err);
  }
  res.json(product);
});

router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("code").notEmpty().withMessage("code is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("status").notEmpty().withMessage("status is required"),
    body("stock").isNumeric().withMessage("Stock must be a number"),
    body("category").notEmpty().withMessage("category is required"),
    body("thumbnail").notEmpty().withMessage("thumbnail is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const products = readJsonFile("../data/products.json");
    const newProduct = {
      id: generateId(),
      ...req.body,
    };
    products.push(newProduct);
    writeJsonFile("../data/products.json", products);
    res.status(201).json(newProduct);
  }
);

router.put(
  "/:pid",
  [
    body("title").optional().notEmpty().withMessage("Title is required"),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Description is required"),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("stock").optional().isNumeric().withMessage("Stock must be a number"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const products = readJsonFile("../data/products.json");
    const product = products.find((p) => p.id === Number(req.params.pid));
    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      return next(err);
    }
    const updatedProduct = { ...product, ...req.body };
    const updatedProducts = products.map((p) =>
      p.id === Number(req.params.pid) ? updatedProduct : p
    );
    writeJsonFile("../data/products.json", updatedProducts);
    res.json(updatedProduct);
  }
);

router.delete("/:pid", (req, res, next) => {
  const products = readJsonFile("../data/products.json");
  const product = products.find((p) => p.id === Number(req.params.pid));
  if (!product) {
    const err = new Error("Product not found");
    err.status = 404;
    return next(err);
  }
  const updatedProducts = products.filter(
    (p) => p.id !== Number(req.params.pid)
  );
  writeJsonFile("../data/products.json", updatedProducts);
  res.json({ message: "Product deleted" });
});

module.exports = router;
