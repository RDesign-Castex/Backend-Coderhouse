const fs = require('fs');

class CartManager {
  constructor(path) {
    this.path = path;
  }

  readCartsFile() {
    try {
      return JSON.parse(fs.readFileSync(this.path, 'utf-8')) || [];
    } catch (err) {
      throw new Error('Error reading the file');
    }
  }

  writeCartsFile(data) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
    } catch (err) {
      throw new Error('Error writing to the file');
    }
  }

  validateCart(cart) {
    // Add your own validation logic here
    if (!cart) {
      throw new Error('Invalid cart data');
    }
  }

  addToCart(cart) {
    this.validateCart(cart);
    const carts = this.readCartsFile();
    carts.push(cart);
    this.writeCartsFile(carts);
    return cart;
  }

  getCarts() {
    return this.readCartsFile();
  }

  updateCart(id, updatedCart) {
    this.validateCart(updatedCart);
    let carts = this.readCartsFile();
    const index = carts.findIndex(cart => cart.id === id);
    if (index === -1) {
      throw new Error('Cart not found');
    }
    updatedCart.id = id;
    carts[index] = updatedCart;
    this.writeCartsFile(carts);
    return updatedCart;
  }

  deleteFromCart(id) {
    let carts = this.readCartsFile();
    const index = carts.findIndex(cart => cart.id === id);
    if (index === -1) {
      throw new Error('Cart not found');
    }
    carts = carts.filter(cart => cart.id !== id);
    this.writeCartsFile(carts);
    return true;
  }
}

module.exports = CartManager;
