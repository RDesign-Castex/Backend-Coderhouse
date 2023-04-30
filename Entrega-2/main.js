const ProductManager = require('./ProductManager');

const productos = new ProductManager();

(async () => {
  await productos.addProduct(
    'Titulo1',
    'Descrition',
    1000,
    'thumbnails1',
    'abc123',
    5
  );
  await productos.addProduct(
    'Titulo2',
    'Descrition',
    2000,
    'thumbnails2',
    'abc123',
    10
  );
  await productos.addProduct(
    'Titulo3',
    'Descrition',
    3000,
    'thumbnails3',
    'abc123',
    15
  );

  await productos.getProducts();
  await productos.getProductsById(1);

  await productos.updateProducts({
    title: 'Titulo1',
    description: 'Descrition',
    price: 2000,
    imagen: 'thumbnails1',
    code: 'abc123',
    stock: 5,
    id: 1,
  });

  await productos.getProducts();
  await productos.deleteProduct(2);
  await productos.getProducts();
})();
