class ProductManager {
  static id = 0;
  products = [];

  addProduct (title, description, price, image, code, stock) {
    if (this.products.find(product => product.code === code)) {
      console.log('El producto ya existe');
      return;
    }

    const newProduct = { title, description, price, image, code, stock };

    if (Object.values(newProduct).includes(undefined)) {
      console.log("Faltan datos");
      return;
    }

    ProductManager.id++;
    this.products.push({ ...newProduct, id: ProductManager.id });
  }

  getProducts () {
    return this.products;
  }

  findProductById(id) {
    const product = this.products.find((product) => product.id === id);
    product ? console.log(product) : console.log("No Disponible");
  }
}

const productos = new ProductManager();

console.log (productos.getProducts()); // Primera llamada arreglo vacío

productos.addProduct('Camiseta', 'Camiseta', 1000, 'https://www.camiseta.com.br/wp-content/uploads/2019/05/camiseta-1.jpg', '1234567890', 10);
productos.addProduct('Camiseta', 'Camiseta', 1000, 'https://www.camiseta.com.br/wp-content/uploads/2019/05/camiseta-1.jpg', '1234567890', 11);

console.log (productos.getProducts()); // Segunda llamada arreglo con producto

productos.findProductById(1); // Busqueda del producto por ID
productos.findProductById(3); // Busqueda por ID no disponible
