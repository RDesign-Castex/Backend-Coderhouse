const fs = require('fs');

class CartManager {
  constructor(path) {
    this.path = path;
  }

  readCartsFile() {
    try {
      const fileContent = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(fileContent) || [];
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
    if (!cart || typeof cart !== 'object') {
      throw new Error('Invalid cart data');
    }
  }

  getCartById(id) {
    const carts = this.readCartsFile();
    const cart = carts.find(cart => cart.id === id.toString());
    if (!cart) {
      throw new Error('Cart not found');
    }
    return cart;
  }

  addToCart(cart) {
    this.validateCart(cart);
    const carts = this.readCartsFile();
    const newCart = { id: Date.now().toString(), ...cart };
    carts.push(newCart);
    this.writeCartsFile(carts);
    return newCart;
  }

  updateCart(id, updatedCart) {
    this.validateCart(updatedCart);
    const carts = this.readCartsFile();
    const index = carts.findIndex(cart => cart.id === id.toString());
    if (index === -1) {
      throw new Error('Cart not found');
    }
    const updated = { id: id.toString(), ...updatedCart };
    carts[index] = updated;
    this.writeCartsFile(carts);
    return updated;
  }

  deleteCart(id) {
    const carts = this.readCartsFile();
    const index = carts.findIndex(cart => cart.id === id.toString());
    if (index === -1) {
      throw new Error('Cart not found');
    }
    carts.splice(index, 1);
    this.writeCartsFile(carts);
  }
}

module.exports = CartManager;
