const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.initFile();
  }

  initFile() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  addProduct(product) {
    try {
      const products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
      product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
      product.stock = product.stock || 0;
      products.push(product);
      fs.writeFileSync(this.path, JSON.stringify(products));
      return product.id;
    } catch (error) {
      return 'addProduct: error';
    }
  }

  getProducts() {
    try {
      const products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
      if (products.length === 0) {
        return 'Not found';
      }
      return products;
    } catch (error) {
      return 'getProducts: error';
    }
  }

  getProductById(id) {
    try {
      const products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
      const product = products.find((product) => product.id === id);
      if (!product) {
        return 'Not found';
      }
      return product;
    } catch (error) {
      return 'getProductById: error';
    }
  }

  updateProduct(id, data) {
    try {
      const products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        return 'Not found';
      }
      products[index] = { ...products[index], ...data };
      fs.writeFileSync(this.path, JSON.stringify(products));
      return 'updateProduct: done';
    } catch (error) {
      return 'updateProduct: error';
    }
  }

  deleteProduct(id) {
    try {
      const products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        return 'Not found';
      }
      products.splice(index, 1);
      fs.writeFileSync(this.path, JSON.stringify(products));
      return 'deleteProduct: done';
    } catch (error) {
      return 'deleteProduct: error';
    }
  }
}

module.exports = ProductManager;
