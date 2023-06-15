# Sistema de Gestión de Productos

Este proyecto implementa un sistema de gestión de productos que permite cargar, guardar y mostrar una lista de productos. El sistema está desarrollado utilizando Node.js y Express, y utiliza Handlebars como motor de plantillas para la generación de páginas HTML. Además, se utiliza Socket.IO para mostrar la lista de productos en tiempo real.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar las dependencias del proyecto.
3. Ejecuta `npm start` para iniciar el servidor.

## Rutas

A continuación se detallan las rutas disponibles en el sistema:

### Cargar Página de Productos

- Método: GET
- Ruta: `http://localhost:8080/load-product`
- Descripción: Renderiza la página de carga de productos.

### Guardar Nuevo Producto

- Método: POST
- Ruta: `http://localhost:8080/api/products`
- Descripción: Guarda un nuevo producto en la base de datos.
- Parámetros de solicitud: Los datos del producto se envían en el cuerpo de la solicitud en formato JSON.
- Respuesta: Retorna un objeto JSON que indica el éxito o fracaso de la operación.

### Mostrar Lista de Productos

- Método: GET
- Ruta: `http://localhost:8080/products`
- Descripción: Renderiza la página que muestra la lista de productos.

### Mostrar Lista de Productos en Tiempo Real

- Método: GET
- Ruta: `http://localhost:8080/realtimeproducts`
- Descripción: Renderiza la página que muestra la lista de productos en tiempo real mediante el uso de Socket.IO.

## Estructura del Proyecto

El proyecto sigue la siguiente estructura de directorios:

- `data/`: Contiene el archivo `products.json` que almacena la lista de productos.
- `public/`: Contiene los archivos estáticos (CSS, JavaScript, imágenes, etc.).
- `views/`: Contiene las plantillas Handlebars para la generación de las páginas HTML.
- `app.js`: Archivo principal que configura y ejecuta el servidor.

## Contribución

Si deseas contribuir a este proyecto, puedes hacerlo a través de los pull requests. Tu ayuda es bienvenida.

## Licencia

Este proyecto está bajo la Licencia MIT. Puedes obtener más información en el archivo `LICENSE`.

