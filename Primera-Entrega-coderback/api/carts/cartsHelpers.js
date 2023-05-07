const fs = require('fs').promises;
const path = require('path');

// Modifica la ruta para guardar el archivo en la carpeta 'data'
const cartsFilePath = path.join(__dirname, '..', '..', 'data', 'carts.json');

// Función para verificar si el archivo carts.json existe y, de lo contrario, crearlo
async function checkAndCreateFile() {
  try {
    await fs.access(cartsFilePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(cartsFilePath, JSON.stringify([], null, 2));
    } else {
      throw error;
    }
  }
}

async function getCarts() {
  await checkAndCreateFile();

  try {
    const data = await fs.readFile(cartsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function saveCarts(carts) {
  await checkAndCreateFile();

  try {
    await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
  } catch (err) {
    console.error(err);
  }
}

module.exports = { saveCarts, getCarts };
