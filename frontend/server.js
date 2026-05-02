const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3333;

const productsPath = path.join(__dirname, 'products.json');
const usersPath = path.join(__dirname, 'users.json');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

// Rota raiz (Agora com links clicáveis em HTML)
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
      <h1>🚀 API Smart Inventory</h1>
      <p>Endpoints disponíveis para consulta:</p>
      <ul style="list-style: none; padding: 0; font-size: 1.2rem;">
        <li style="margin: 10px 0;">
          <a href="/users" style="color: #007bff; text-decoration: none; font-weight: bold;">👉 /users</a>
        </li>
        <li style="margin: 10px 0;">
          <a href="/products" style="color: #007bff; text-decoration: none; font-weight: bold;">👉 /products</a>
        </li>
      </ul>
    </div>
  `);
});

// Rota de Produtos
app.get('/products', (req, res) => {
  res.json(products);
});

// Rota de Usuários
app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`✅ API rodando na porta ${PORT}`);
  console.log(`📦 Endpoints: /products , /users`);
});