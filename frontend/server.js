const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3333;

// Caminhos dos seus arquivos
const productsPath = path.join(__dirname, 'products.json');
const usersPath = path.join(__dirname, 'users.json');

// Lê os dados uma vez (para não ler a cada requisição – mas pode ser melhorado depois)
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

// Endpoints
app.get('/', (req, res) => {
  res.send('API Smart Inventory - endpoints disponíveis: /users, /products');
});

app.listen(PORT, () => {
  console.log(`✅ API rodando na porta ${PORT}`);
  console.log(`📦 Endpoints: /products , /users`);
});