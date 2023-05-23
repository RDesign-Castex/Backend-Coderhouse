// app.js

const express = require("express");
const exphbs = require("express-handlebars");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
//const { body, validationResult } = require("express-validator");
//const axios = require("axios");
//const natural = require("natural");

const utils = require("./utils/function"); // Importar el módulo de utilidades
const routes = require("./routes/router"); // Importar el módulo de rutas
const chatbot = require("./services/chatbot"); // Importar el módulo de chatbot

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Configuración de Handlebars
app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Usar las rutas definidas en el módulo de rutas
app.use(routes);

// Configuración de Socket.IO
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  // Usar las funciones de utilidad para leer y escribir archivos JSON
  const productsFilePath = path.join(__dirname, "data/products.json");
  const products = utils.readJsonFile(productsFilePath);
  socket.emit("products", products);

  socket.on("update", () => {
    const updatedProducts = utils.readJsonFile(productsFilePath);
    socket.emit("products", updatedProducts);
  });
});

module.exports = app;
