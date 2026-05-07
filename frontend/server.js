const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); // Permite que o frontend acesse a API
app.use(express.json()); // Habilita o recebimento de JSON no corpo das requisições
 
// Ele tentará ler a porta do sistema; se não houver, usa a 3333 (para seu teste local).
const PORT = process.env.PORT || 3333;

const productsPath = path.join(__dirname, 'products.json');
const usersPath = path.join(__dirname, 'users.json');

// Helper para ler dados garantindo a estrutura correta
const readData = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
// Helper para salvar dados mantendo a formatação
const saveData = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// --- ROTAS DE USUÁRIOS ---

app.get('/users', (req, res) => {
  const { email, password } = req.query;
  let { users } = readData(usersPath);
  
  // Filtro de login: se enviar email/senha, busca o usuário específico
  if (email) users = users.filter(u => u.email === email);
  if (password) users = users.filter(u => u.password === password);
  
  res.json(users); // Retorna Array direto conforme o frontend espera
});

app.post('/users', (req, res) => {
  const data = readData(usersPath);
  const newUser = { 
    id: Math.random().toString(36).substr(2, 9), 
    ...req.body 
  };
  data.users.push(newUser);
  saveData(usersPath, data);
  res.status(201).json(newUser);
});

app.delete('/users/:id', (req, res) => {
  const data = readData(usersPath);
  data.users = data.users.filter(u => u.id !== req.params.id);
  saveData(usersPath, data);
  res.status(204).send();
});

// --- ROTAS DE PRODUTOS ---

app.get('/products', (req, res) => {
  const { products } = readData(productsPath);
  res.json(products);
});

app.post('/products', (req, res) => {
  const data = readData(productsPath);
  const newProduct = { 
    id: Math.random().toString(36).substr(2, 9), 
    ...req.body 
  };
  data.products.push(newProduct);
  saveData(productsPath, data);
  res.status(201).json(newProduct);
});

// ✅ ALTERADO: Agora usa a variável PORT dinâmica
app.listen(PORT, () => console.log(`✅ API Smart Inventory rodando na porta ${PORT}`));