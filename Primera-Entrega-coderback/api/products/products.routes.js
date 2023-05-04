const express = require("express");
const productsController = require("./products.controller.js");
const upload = require("../../middleware/multerConfig.js");
const router = express.Router();

router.get("/", productsController.getProducts);
router.get("/:pid", productsController.getProductById);
router.post("/", upload.single("thumbnail"), (req, res) => {});
router.put("/:pid", productsController.updateProduct);
router.delete("/:pid", productsController.deleteProduct);

module.exports = router;
