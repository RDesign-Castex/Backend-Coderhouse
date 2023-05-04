const cartsService = require("./carts.service");

exports.getCartById = (req, res) => {
  const cartId = req.params.cid;
  const cart = cartsService.getCartById(cartId);

  if (!cart) {
    return res.status(400).send({ status: "error", error: "Cart not found" });
  }
  res.send({ status: "success", payload: cart });
};

exports.createCart = (req, res) => {
  const newCart = req.body;
  const createdCart = cartsService.createCart(newCart);

  if (!createdCart) {
    return res.status(400).send({ status: "error", error: "Cart creation failed" });
  }
  res.send({ status: "success", payload: createdCart });
};

exports.addProductToCart = (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const addedProduct = cartsService.addProductToCart(cartId, productId);

  if (!addedProduct) {
    return res.status(400).send({ status: "error", error: "Adding product to cart failed" });
  }
  res.send({ status: "success", payload: addedProduct });
};
