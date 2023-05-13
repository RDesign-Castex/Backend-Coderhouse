# Servidor Express

Este proyecto implementa un servidor Express que permite gestionar productos y carritos.

## Cómo levantar el servidor

1. Asegúrese de tener instalado Node.js.
2. Clone este repositorio.
3. Ejecute `npm install` en la carpeta del repositorio para instalar las dependencias.
4. Ejecute `node src/server.js` para iniciar el servidor.
5. El servidor estará ejecutándose en el puerto 3000 (o en el puerto especificado en la variable de entorno PORT).

## Cómo usar las rutas

### Productos

- GET /api/products: Devuelve todos los productos. Se puede utilizar el parámetro `?limit=` para limitar la cantidad de resultados.
- GET /api/products/:pid: Devuelve el producto con el ID especificado.

### Carritos

- GET /api/carts: Devuelve todos los carritos.
- GET /api/carts/:cid: Devuelve el carrito con el ID especificado.

### Para probar este codigo puedes usar "curl"

Obtener todos los productos:

- curl http://localhost:3000/api/products
  Obtener productos con límite (por ejemplo, límite de 5):
- curl http://localhost:3000/api/products?limit=5
  Obtener un producto específico por ID (por ejemplo, ID 3):
- curl http://localhost:3000/api/products/3
  Obtener todos los carritos:
- curl http://localhost:3000/api/carts
  Obtener un carrito específico por ID (por ejemplo, ID 2):
- curl http://localhost:3000/api/carts/2
