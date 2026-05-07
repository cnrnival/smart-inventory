const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3333;

// Arquivos JSON estão na MESMA pasta que este server.js
const productsPath = path.join(__dirname, 'products.json');
const usersPath = path.join(__dirname, 'users.json');

function readProducts() {
  const data = fs.readFileSync(productsPath, 'utf8');
  return JSON.parse(data);
}

function writeProducts(data) {
  fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));
}

function readUsers() {
  const data = fs.readFileSync(usersPath, 'utf8');
  return JSON.parse(data);
}

function writeUsers(data) {
  fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));
}

// Rota raiz (opcional, só para não dar "Cannot GET /")
app.get('/', (req, res) => {
  res.json({ message: 'Smart Inventory API', endpoints: ['/users', '/products'] });
});

// USERS
app.get('/users', (req, res) => {
  const { email, password } = req.query;
  let { users } = readUsers();
  if (email) users = users.filter(u => u.email === email);
  if (password) users = users.filter(u => u.password === password);
  res.json(users);
});

app.post('/users', (req, res) => {
  const data = readUsers();
  const newUser = { id: Math.random().toString(36).substr(2, 9), ...req.body };
  data.users.push(newUser);
  writeUsers(data);
  res.status(201).json(newUser);
});

app.delete('/users/:id', (req, res) => {
  const data = readUsers();
  data.users = data.users.filter(u => u.id !== req.params.id);
  writeUsers(data);
  res.status(204).send();
});

// PRODUCTS
app.get('/products', (req, res) => {
  const { products } = readProducts();
  res.json(products);
});

app.post('/products', (req, res) => {
  const data = readProducts();
  const newProduct = { id: Math.random().toString(36).substr(2, 9), ...req.body };
  data.products.push(newProduct);
  writeProducts(data);
  res.status(201).json(newProduct);
});

app.delete('/products/:id', (req, res) => {
  const data = readProducts();
  data.products = data.products.filter(p => p.id !== req.params.id);
  writeProducts(data);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`✅ API rodando na porta ${PORT}`);
  console.log(`📦 Produtos: ${productsPath}`);
  console.log(`👥 Usuários: ${usersPath}`);
});