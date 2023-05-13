const fs = require("fs").promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.currentId = 0;
    this.init();
  }

  async init() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      this.products = data ? JSON.parse(data) : [];
      this.currentId =
        this.products.length > 0
          ? this.products[this.products.length - 1].id
          : 0;
    } catch (error) {
      if (error.code === "ENOENT") {
        // El archivo no existe, inicializar con un array vacío
        this.products = [];
      } else {
        console.error("Error loading products:", error);
      }
    }
  }

  async writeToFile() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), {
        flag: "w",
      });
    } catch (error) {
      console.error("Error writing to file:", error);
    }
  }

  async addProduct(product) {
    product.id = ++this.currentId;
    product.stock = product.stock || 0; // Si el stock no se proporciona, se establece en 0
    this.products.push(product);
    await this.writeToFile();
    return product;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  async updateProduct(id, updatedProduct) {
    const product = this.getProductById(id);
    if (!product) return "updateProduct: error"; // Devuelve un mensaje de error si el producto no se encuentra

    Object.assign(product, updatedProduct);
    await this.writeToFile();
    return product;
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) return "deleteProduct: error"; // Devuelve un mensaje de error si el producto no se encuentra

    const deletedProduct = this.products.splice(index, 1)[0];
    await this.writeToFile();
    return deletedProduct; // Retorna el producto eliminado
  }
}

module.exports = ProductManager;
