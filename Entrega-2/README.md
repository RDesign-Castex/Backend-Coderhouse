
![image text](https://camo.githubusercontent.com/5aaf4ad1d09bbc72f7fcc389b203a255c2d164c4958b50635a4797cc35dbf287/68747470733a2f2f692e706f7374696d672e63632f4a6e724b717232302f7264657369676e2e706e67)

# ProductManager - Manejo de archivos


* Este es un código en JavaScript que utiliza el módulo 'fs' para manejar archivos de texto plano en formato JSON. El archivo 'productos.txt' es utilizado como base de datos para guardar y manejar productos. El código utiliza una clase llamada ProductManager para manejar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la base de datos.

* Funciones
addProduct(producto): Agrega un nuevo producto a la base de datos. Este método utiliza el método writeFile() para escribir el nuevo producto en formato JSON en el archivo 'productos.txt'.

* readProducts(): Lee todo el contenido del archivo 'productos.txt' y lo devuelve como un objeto JSON.

* getProducts(): Obtiene todos los productos de la base de datos y los muestra en la consola. Utiliza el método readProducts().

* getProductsById(id): Recibe un id como parámetro y devuelve el producto que corresponde a ese id. Utiliza el método readProducts() para obtener todos los productos de la base de datos y luego filtra el producto que tiene el id proporcionado.

* deleteProductsById(id): Recibe un id como parámetro y elimina el producto correspondiente de la base de datos. Utiliza el método readProducts() para obtener todos los productos de la base de datos, filtra el producto que tiene el id proporcionado y escribe de nuevo el archivo sin ese producto.

* updateProducts(productoActualizado): Recibe un objeto como parámetro con el id del producto a actualizar y los nuevos valores. Elimina el producto antiguo utilizando el método deleteProductsById() y luego utiliza el método readProducts() para obtener todos los productos de la base de datos. Finalmente, crea un nuevo objeto que contiene los nuevos valores y lo agrega a la base de datos utilizando el método writeFile().

* Uso
* Para utilizar este código, se debe crear una instancia de la clase ProductManager y llamar a los métodos correspondientes según sea necesario. Por ejemplo:
````
```

javascript

const ProductManager = require('./ProductManager');
const pm = new ProductManager();

pm.addProduct({id: 1, nombre: 'Camisa', precio: 20});
pm.getProducts();
pm.getProductsById(1);
pm.updateProduct({id: 1, nombre: 'Camisa nueva', precio: 25});
pm.deleteProductsById(1);

```
````

* En resumen, este código permite manipular una base de datos de productos en formato JSON utilizando el módulo 'fs' de Node.js.
