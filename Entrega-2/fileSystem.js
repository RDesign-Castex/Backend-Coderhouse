import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.patch = "./productos.txt";
    this.products = [];
  }
  static id = 0;

  addProduct = async (title, description, price, imagen, code, stock) => {
    ProductManager.id++;
    let newProduct = {
      title,
      description,
      price,
      imagen,
      code,
      stock,
      id: ProductManager.id,
    };

    this.products.push(newProduct);

    await fs.writeFile(this.patch, JSON.stringify(this.products));
  };

  readProducts = async () => {
    let respuesta = await fs.readFile(this.patch, "utf-8");
    return JSON.parse(respuesta);
  };

  getProducts = async () => {
    let respuesta2 = await this.readProducts();
    return console.log(respuesta2);
  };
  getProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    if (!respuesta3.find((product) => product.id === id)) {
      console.log("No existe el producto");
    } else {
      console.log(respuesta3.filter((product) => product.id === id));
    }
  };

  deleteProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    let productFilter = respuesta3.filter((products) => products.id != id);
    await fs.writeFile(this.patch, JSON.stringify(productFilter));
    console.log("Producto eliminado");
  };

  updateProducts = async ({ id, ...producto }) => {
    await this.deleteProductsById(id);
    let productOld = await this.readProducts();
    let productModif = [{ ...producto, id }, ...productOld];
    await fs.writeFile(this.patch, JSON.stringify(productModif));
  };
}

const productos = new ProductManager();
//productos.addProduct("Titulo1","Descrition", 1000, "Imagen1", "abc123", 5)
//productos.addProduct("Titulo2","Descrition", 2000, "Imagen2", "abc123",10)
//productos.addProduct("Titulo3","Descrition", 3000, "Imagen3", "abc123",15)
//productos.getProducts()
//productos.getProductsById(1)
productos.updateProducts({
  title: "Titulo1",
  description: "Descrition",
  price: 2000,
  imagen: "Imagen1",
  code: "abc123",
  stock: 5,
  id: 1,
});
