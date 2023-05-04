const express = require("express");
const productsController = require("./products.controller");
const router = express.Router();

router.get("/", productsController.getProducts);
router.get("/:pid", productsController.getProductById);
router.post("/", productsController.createProduct);
router.put("/:pid", productsController.updateProduct);
router.delete("/:pid", productsController.deleteProduct);

module.exports = router;
