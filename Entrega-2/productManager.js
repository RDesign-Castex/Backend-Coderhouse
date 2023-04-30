const fs = require('fs').promises;

class ProductManager {
  constructor() {
    this.patch = './data/data.json';
    this.products = [];
  }
  static id = 0;

  async addProduct(title, description, price, thumbnails, code, stock) {
    ProductManager.id++;
    let newProduct = {
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      id: ProductManager.id,
    };

    this.products.push(newProduct);
    await fs.writeFile(this.patch, JSON.stringify(this.products));
  }

  async getProducts() {
    let respuesta = await fs.readFile(this.patch, 'utf-8');
    return console.log(JSON.parse(respuesta));
  }

  async getProductsById(id) {
    let respuesta = await fs.readFile(this.patch, 'utf-8');
    const products = JSON.parse(respuesta);
    const productFound = products.find((product) => product.id === id);

    if (!productFound) {
      console.log('No existe el producto');
    } else {
      console.log(productFound);
    }
  }

  async deleteProduct(id) {
    let respuesta = await fs.readFile(this.patch, 'utf-8');
    const products = JSON.parse(respuesta);
    const updatedProducts = products.filter((product) => product.id !== id);

    await fs.writeFile(this.patch, JSON.stringify(updatedProducts));
    console.log('Producto eliminado');
  }

  async updateProducts({ id, ...producto }) {
    await this.deleteProduct(id);
    let respuesta = await fs.readFile(this.patch, 'utf-8');
    const products = JSON.parse(respuesta);
    const updatedProducts = [{ ...producto, id }, ...products];

    await fs.writeFile(this.patch, JSON.stringify(updatedProducts));
  }
}

module.exports = ProductManager;
