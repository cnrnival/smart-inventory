const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3333;

const productsPath = path.join(__dirname, 'products.json');
const usersPath = path.join(__dirname, 'users.json');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

// Rota raiz (mensagem informativa)
app.get('/', (req, res) => {
  res.send('API Smart Inventory - endpoints disponíveis: /users, /products');
});

// Rota 
app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/users', (req, res) => {
  res.json(users);
});
app.listen(PORT, () => {
  console.log(`✅ API rodando na porta ${PORT}`);
  console.log(`📦 Endpoints: /products , /users`);
});