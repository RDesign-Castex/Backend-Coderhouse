const express = require("express");
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const apiRoutes = require("./api/routes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(
  "/bootstrap/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/bootstrap/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/jquery",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
app.post("/uploads", upload.single("file"), (req, res) => {
  try {
    res.send({ message: "File uploaded successfully", file: req.file });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Configurar Pug como motor de plantillas
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Rutas
app.get("/", (req, res) => {
  res.render("index");
});

// Asegúrese de agregar el router al middleware de Express
app.use("/api", apiRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
