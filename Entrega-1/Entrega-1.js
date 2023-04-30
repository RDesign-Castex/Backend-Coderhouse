class ProductManager {
  constructor () {
    this.products = [];
  }

  static id = 0

  addProduct (title, description, price, image, code, stock) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].code === code) {
        console.log('El producto ya existe');
        return;
      }
    }

    const newProduct ={
      title,
      description,
      price,
      image,
      code,
      stock,
    }
    if(!Object.values(newProduct).includes(undefined)){
      ProductManager.id++
      this.products.push({
      ...newProduct,
      id:ProductManager.id
    });
    }else{
      console.log("Faltan datos")
    }
  }

  getProduct () {
    return this.products;
  }

  Disponible(id){
    return this.products.find((product) => product.id === id)
  }

  getProductById(id){
    !this.Disponible(id) ? console.log("No Disponible") : console.log(this.Disponible(id))
  }
}
const productos = new ProductManager
// Primera llamada arreglo vacio
console.log (productos.getProduct())
//Agregando Producto
productos.addProduct('Camiseta', 'Camiseta', 1000, 'https://www.camiseta.com.br/wp-content/uploads/2019/05/camiseta-1.jpg', '1234567890', 10)
productos.addProduct('Camiseta', 'Camiseta', 1000, 'https://www.camiseta.com.br/wp-content/uploads/2019/05/camiseta-1.jpg', '1234567890', 11)

// Segunda llamada arreglo con Producto
console.log (productos.getProduct())
// busqueda del producto por ID
productos.getProductById(1)

// Busqueda por ID no disponible
productos.getProductById(3)