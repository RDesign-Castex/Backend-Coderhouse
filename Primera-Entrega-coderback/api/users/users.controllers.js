const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../../data/users.json");

// Leer el archivo users.json
function readUsersData() {
  const data = fs.readFileSync(usersFilePath, "utf8");
  return JSON.parse(data);
}

// Escribir datos en el archivo users.json
function writeUsersData(data) {
  const updatedData = JSON.stringify(data, null, 2);
  fs.writeFileSync(usersFilePath, updatedData, "utf8");
}

function createUser(userData) {
  const usersData = readUsersData();
  usersData.users.push(userData);
  writeUsersData(usersData);
}

function getAllUsers(req, res) {
  const usersData = readUsersData();
  res.json(usersData.users);
}

function getUserById(req, res) {
  const usersData = readUsersData();
  const user = usersData.users.find(
    (user) => user.id === parseInt(req.params.id)
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
}

function create(req, res) {
  const usersData = readUsersData();
  const newUser = {
    id: usersData.users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  createUser(newUser);
  res.status(201).json(newUser);
}

function update(req, res) {
  const usersData = readUsersData();
  const user = usersData.users.find(
    (user) => user.id === parseInt(req.params.id)
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.name = req.body.name;
  user.email = req.body.email;
  writeUsersData(usersData);
  res.json(user);
}

function deleteUser(req, res) {
  const usersData = readUsersData();
  const index = usersData.users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  usersData.users.splice(index, 1);
  writeUsersData(usersData);
  res.status(204).send();
}

// Exportar las funciones
module.exports = {
  getAllUsers,
  getUserById,
  create,
  update,
  deleteUser,
};
