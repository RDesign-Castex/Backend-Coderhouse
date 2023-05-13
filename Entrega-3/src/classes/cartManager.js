const fs = require('fs').promises;

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async addCart() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      const carts = JSON.parse(data);
      const id = carts.length + 1;
      const newCart = {
        id,
        products: [],
      };

      carts.push(newCart);
      await fs.writeFile(this.path, JSON.stringify(carts));
      return id;
    } catch (error) {
      console.error(error);
      return 'addCart: error';
    }
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      const carts = JSON.parse(data);
      return carts.length ? carts : 'Not found';
    } catch (error) {
      console.error(error);
      return 'getCarts: error';
    }
  }

  async getCartById(cid) {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      const carts = JSON.parse(data);
      const cart = carts.find((c) => c.id === cid);
      return cart ? cart : 'Not found';
		} catch (error) {
		console.error(error);
		return 'getCartById: error';
		}
		}
		}
		
		module.exports = CartManager;
