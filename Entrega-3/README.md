# Servidor Express - Ejemplo de README

Este repositorio contiene un servidor Express que implementa la funcionalidad de manejo de productos y carritos. A continuación se detalla lo realizado hasta el momento y cómo probarlo.

## Funcionalidades implementadas

- Gestión de productos:
  - Agregar un nuevo producto
  - Obtener todos los productos
  - Obtener un producto por ID
  - Actualizar un producto
  - Eliminar un producto

- Gestión de carritos:
  - Agregar un nuevo carrito
  - Obtener todos los carritos
  - Obtener un carrito por ID
  - Actualizar un carrito
  - Eliminar un carrito
  - Agregar un producto a un carrito

## Requisitos previos

- Node.js (v12 o superior)
- NPM (viene incluido con Node.js)

## Instalación

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en el directorio raíz del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install

## Inicia el servidor
1. node src/server.js

## Obtener todos los productos:
curl http://localhost:3000/api/products

## Obtener un producto por ID:
curl http://localhost:3000/api/products/:id

## Agregar un nuevo producto:
curl -X POST -H "Content-Type: application/json" -d '{"title":"Nuevo producto", "description":"Descripción del producto", "price": 19.99, "thumbnail": "imagen.png", "code": "ABC123", "stock": 10}' http://localhost:3000/api/products

## Actualizar un producto por ID:
curl -X PUT -H "Content-Type: application/json" -d '{"title":"Nuevo título", "description":"Nueva descripción"}' http://localhost:3000/api/products/:id

## Eliminar un producto por ID:
curl -X DELETE http://localhost:3000/api/products/:id

## Agregar un producto a un carrito:
curl -X POST -H "Content-Type: application/json" -d '{"productId":"123"}' http://localhost:3000/api/carts/:cartId/products

## Obtener un carrito por ID:
curl http://localhost:3000/api/carts/:id

## Eliminar un producto de un carrito:
curl -X DELETE http://localhost:3000/api/carts/:cartId/products/:productId




