const express = require("express");
const exphbs = require("express-handlebars");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const fs = require("fs");

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

// Ruta para cargar la página load-product
app.get("/load-product", (req, res) => {
  res.render("load-product");
});

// Ruta para mostrar la lista de productos
app.get("/products", (req, res) => {
  const productsFilePath = path.join(__dirname, "data/products.json");
  const products = readJsonFile(productsFilePath);
  res.render("products", { products });
});

// Ruta para mostrar la lista de productos en tiempo real
app.get("/realtimeproducts", (req, res) => {
  const productsFilePath = path.join(__dirname, "data/products.json");
  const products = readJsonFile(productsFilePath);
  res.render("realtimeproducts", { products });
});

// Ruta para guardar un nuevo producto
app.post("/api/products", (req, res) => {
  const newProduct = req.body;
  const productsFilePath = path.join(__dirname, "data/products.json");
  const products = readJsonFile(productsFilePath);

  // Generar un nuevo ID para el producto
  const maxId = products.reduce((max, product) => {
    return product.id > max ? product.id : max;
  }, 0);
  newProduct.id = maxId + 1;

  // Agregar el nuevo producto a la lista
  products.push(newProduct);

  // Guardar la lista actualizada en el archivo products.json
  writeJsonFile(productsFilePath, products)
    .then(() => {
      // Enviar una respuesta de éxito
      res
        .status(201)
        .json({ message: "Product saved successfully", product: newProduct });
    })
    .catch((error) => {
      console.error(`Error writing JSON file: ${productsFilePath}`);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Configuración de Socket.IO
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  // Enviar lista de productos al cliente
  const productsFilePath = path.join(__dirname, "data/products.json");
  const products = readJsonFile(productsFilePath);
  socket.emit("products", products);

  // Escuchar el evento "update" para recibir actualizaciones de productos
  socket.on("update", () => {
    const updatedProducts = readJsonFile(productsFilePath);
    socket.emit("products", updatedProducts);
  });
});

// Función para leer el archivo JSON
function readJsonFile(file) {
  try {
    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file: ${file}`, error);
    return [];
  }
}

// Función para escribir el archivo JSON
function writeJsonFile(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, JSON.stringify(data), "utf8", (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

module.exports = app;
