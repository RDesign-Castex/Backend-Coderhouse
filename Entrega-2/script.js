const fs = require('fs');
const ProductManager = require('./productManager');

const manager = new ProductManager('data/data.json');

// Agrega 10 productos al administrador
for (let i = 1; i <= 10; i++) {
  manager.addProduct({ name: `Product ${i}`, price: i * 10 });
}

// Muestra todos los productos
console.log('All products:');
console.log(manager.getProducts());

// Elimina el producto con ID 9
console.log('Deleting product with ID 9:');
manager.deleteProduct(9);

// Intenta actualizar el producto con ID 9, pero no tendrá efecto ya que el producto fue eliminado
console.log('Updating product with ID 9:');
manager.updateProduct(9, { name: 'Updated Product 9' });

// Elimina el producto con ID 10
console.log('Deleting product with ID 10:');
manager.deleteProduct(10);

// Muestra todos los productos restantes
console.log('Remaining products:');
console.log(manager.getProducts());
