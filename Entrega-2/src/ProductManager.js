const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.currentId = 0;
    this.init();
  }

  async init() {
    try {
      const data = await fs.readFile(this.path);
      this.products = JSON.parse(data);
      this.currentId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  async writeToFile() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error('Error writing to file:', error);
    }
  }

  async addProduct(product) {
    product.id = ++this.currentId;
    this.products.push(product);
    await this.writeToFile();
    return product;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  async updateProduct(id, updatedProduct) {
    const product = this.getProductById(id);
    if (!product) return null;

    Object.assign(product, updatedProduct);
    await this.writeToFile();
    return product;
  }

  async deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) return false;

    this.products.splice(index, 1);
    await this.writeToFile();
    return true;
  }
}

module.exports = ProductManager;
