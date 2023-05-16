const express = require("express");
const exphbs = require("express-handlebars");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const { readJsonFile } = require("./utils/fileManager");

const productsRouter = require("./api/products");
const cartsRouter = require("./api/carts");
const errorHandler = require("./middleware/errorHandler");
const viewsRouter = require("./api/views");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuración de Express
app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(viewsRouter);
app.use(errorHandler);
app.use(express.static(path.join(__dirname, "public"))); // Se agrega el middleware para servir archivos estáticos

// Configuración de Handlebars
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

// Ruta raíz para mostrar la vista index.handlebars
app.get("/", (req, res) => {
  res.render("index");
});

// Ruta para cargar la página load-product
app.get("/load-product", (req, res) => {
  res.render("load-product");
});

// Ruta para mostrar la lista de productos
app.get("/products", (req, res) => {
  const products = readJsonFile(path.join(__dirname, "/data/products.json")); // Leer el contenido de products.json

  res.render("products", { products });
});

// Configuración de Socket.IO
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  // Enviar mensaje de conexión exitosa al cliente
  socket.emit("connected", "Conexión exitosa");

  // Evento de desconexión
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

module.exports = app;
