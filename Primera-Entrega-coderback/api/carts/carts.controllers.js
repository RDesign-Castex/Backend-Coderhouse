const { saveCarts, getCarts } = require('../carts/cartsHelpers');
exports.addProductToCart = async (req, res) => {
  const product = req.body;
  
  // Obtener los datos actuales del carrito
  const carts = await getCarts();
  
  // Agregar el producto al carrito
  carts.push(product);
  
  // Guardar el carrito actualizado en el archivo carts.json
  await saveCarts(carts);
  
  res.status(201).send({ message: 'Product added to cart', product });
};
// Ejemplo de datos de carritos
const carts = [
  { id: 1, items: [{ productId: 1, quantity: 2 }] },
  { id: 2, items: [{ productId: 2, quantity: 1 }] },
];

exports.getAllCarts = (req, res) => {
  res.json(carts);
};

exports.getCartById = (req, res) => {
  const cart = carts.find((cart) => cart.id === parseInt(req.params.id));
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  res.json(cart);
};

exports.createCart = (req, res) => {
  const newCart = {
    id: carts.length + 1,
    items: req.body.items,
  };
  carts.push(newCart);
  res.status(201).json(newCart);
};

exports.updateCart = (req, res) => {
  const cart = carts.find((cart) => cart.id === parseInt(req.params.id));
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  cart.items = req.body.items;
  res.json(cart);
};

exports.deleteCart = (req, res) => {
  const index = carts.findIndex((cart) => cart.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  carts.splice(index, 1);
  res.status(204).send();
};
