const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  readProductsFile() {
    try {
      return JSON.parse(fs.readFileSync(this.path, 'utf-8')) || [];
    } catch (err) {
      throw new Error('Error reading the file');
    }
  }

  writeProductsFile(data) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
    } catch (err) {
      throw new Error('Error writing to the file');
    }
  }

  getNextId(products) {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  }

  validateProduct(product) {
    // You should add your own validation logic here
    if (!product) {
      throw new Error('Invalid product data');
    }
  }

  addProduct(product) {
    this.validateProduct(product);
    const products = this.readProductsFile();
    product.id = this.getNextId(products);
    products.push(product);
    this.writeProductsFile(products);
    return product;
  }

  getProducts() {
    return this.readProductsFile();
  }

  getProductById(id) {
    const products = this.readProductsFile();
    const product = products.find(product => product.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  updateProduct(id, updatedProduct) {
    this.validateProduct(updatedProduct);
    let products = this.readProductsFile();
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    updatedProduct.id = id;
    products[index] = updatedProduct;
    this.writeProductsFile(products);
    return updatedProduct;
  }

  deleteProduct(id) {
    let products = this.readProductsFile();
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    products = products.filter(product => product.id !== id);
    this.writeProductsFile(products);
    return true;
  }
}

module.exports = ProductManager;
