const fs = require("fs");
const path = require("path");

function readJsonFile(filename) {
  const filePath = path.join(__dirname, "..", "data", filename);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// Leer un archivo JSON
function readJsonFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading JSON file: ${filePath}`, error);
    return null;
  }
}

// Escribir un archivo JSON
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing JSON file: ${filePath}`, error);
  }
}

module.exports = {
  readJsonFile,
  writeJsonFile,
};

function writeJsonFile(filename, data) {
  const filePath = path.join(__dirname, "..", "data", filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function generateId() {
  const products = readJsonFile("../data/products.json");
  const maxId = Math.max(...products.map((p) => p.id), 0);
  return maxId + 1;
}

module.exports = { readJsonFile, writeJsonFile, generateId };
