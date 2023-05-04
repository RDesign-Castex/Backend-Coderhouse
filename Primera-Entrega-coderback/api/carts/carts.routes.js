const express = require("express");
const cartsController = require("./carts.controller");
const router = express.Router();

router.get("/:cid", cartsController.getCartById);
router.post("/", cartsController.createCart);
router.post("/:cid/product/:pid", cartsController.addProductToCart);

module.exports = router;
