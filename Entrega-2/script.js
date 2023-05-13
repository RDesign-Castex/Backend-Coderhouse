const ProductManager = require("./src/ProductManager");

(async () => {
  const productManager = new ProductManager("./data/data.json");

  // Add 10 products
  for (let i = 1; i <= 10; i++) {
    try {
      const newProduct = await productManager.addProduct({
        title: `Product rene${i}`,
        description: `Description of Product ${i}`,
        price: 100 * i,
        thumbnail: `/path/to/image${i}.jpg`,
        code: `prod${i}`,
        stock: 10 * i,
      });
      console.log(newProduct);
    } catch (error) {
      console.error("addProduct: error");
    }
  }

  // Get a product by ID
  try {
    const product = productManager.getProductById(1);
    console.log(product);
  } catch (error) {
    console.error("getProductById: error");
  }

  // Update a product
  try {
    const updatedProduct = await productManager.updateProduct(1, {
      title: "Updated Product 1",
    });
    console.log(updatedProduct);
  } catch (error) {
    console.error("updateProduct: error");
  }

  // Delete a product
  try {
    const isDeleted = await productManager.deleteProduct(1);
    console.log(isDeleted);
  } catch (error) {
    console.error("deleteProduct: error");
  }
})();
