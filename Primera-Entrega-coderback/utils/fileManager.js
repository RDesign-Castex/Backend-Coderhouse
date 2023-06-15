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
