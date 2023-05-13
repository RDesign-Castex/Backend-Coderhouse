const ProductManager = require('./src/ProductManager');

async function manageProducts() {
  const productManager = new ProductManager('./data/data.json');

  // Add a product
  const newProduct = await productManager.addProduct({
    title: 'Product 1',
    description: 'Description of Product 1',
    price: 100,
    thumbnail: '/path/to/image.jpg',
    code: 'prod1',
    stock: 10,
  });
  console.log(newProduct);

  // Get a product by ID
  const product = productManager.getProductById(newProduct.id);
  console.log(product);

  // Update a product
  const updatedProduct = await productManager.updateProduct(newProduct.id, {
    title: 'Updated Product 1',
  });
  console.log(updatedProduct);

  // Delete a product
  const isDeleted = await productManager.deleteProduct(newProduct.id);
  console.log(isDeleted);
}

manageProducts();
