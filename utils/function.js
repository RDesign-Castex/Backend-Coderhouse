
const fs = require("fs");
const path = require("path");

function readJsonFile(file) {
  try {
    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file: ${file}`, error);
    return [];
  }
}

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

function generateId() {
  const productsFilePath = path.join(__dirname, "../data/products.json");

  if (fs.existsSync(productsFilePath)) {
    const products = readJsonFile(productsFilePath);

    if (products.length > 0) {
      const maxId = Math.max(...products.map((p) => p.id), 0);
      return maxId + 1;
    }
  }

  return 1; // Si el archivo no existe o está vacío, devuelve 1 como ID inicial
}

module.exports = {
  readJsonFile,
  writeJsonFile,
  generateId,
};
