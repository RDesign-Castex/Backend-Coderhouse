# Documentación

 Clona el repositorio en tu máquina local.
 Instala las dependencias ejecutando el siguiente comando:
 npm install

## Inici el servidor 

 nodemon src/serve.js 

# API Endpoints
## A continuación se describen los endpoints disponibles en la API:

### Productos
GET /api/products: Obtiene todos los productos.
GET /api/products/:pid: Obtiene un producto específico por su ID.
POST /api/products: Crea un nuevo producto.
PUT /api/products/:pid: Actualiza un producto existente por su ID.
DELETE /api/products/:pid: Elimina un producto existente por su ID.
### Carritos
GET /api/carts/:cid: Obtiene un carrito específico por su ID.
POST /api/carts: Crea un nuevo carrito.
POST /api/carts/:cid/product/:pid: Agrega un producto al carrito.
PUT /api/carts/:cid: Actualiza un carrito existente por su ID.
DELETE /api/carts/:cid/product/:pid: Elimina un producto del carrito.

## Para probar su funcionamiento utiliza 

http://localhost:8080/api/products muestra todos los productos
http://localhost:8080/api/products/  crea productos
http://localhost:8080/api/products/1 devuelve producto 1	
http://localhost:8080/api/products/1 actualiza producto 1
http://localhost:8080/api/products/1 elimina producto 1

de igual manera pero cambiando products por "carts" y utilizan la misma ruta se puede probar carts
ejemplo :
http://localhost:8080/api/carts