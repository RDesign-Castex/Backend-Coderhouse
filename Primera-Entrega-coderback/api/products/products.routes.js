const express = require("express");
const router = express.Router();
const productsController = require("./products.controllers");
const upload = require('../../middleware/multerConfig');

router.post('/', upload.single('thumbnail'), productsController.createProduct);
router.get('/', productsController.getProducts);

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.post("/", productsController.createProduct);
router.put("/:id", productsController.updateProduct);
router.delete("/:id", productsController.deleteProduct);

module.exports = router;
