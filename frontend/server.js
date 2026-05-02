const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

// Caminhos dos seus arquivos separados
const productsPath = path.join(dirname, 'products.json');
const usersPath = path.join(dirname, 'users.json');

// Lê os dados
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

// Combina os dois em um único objeto para o json-server (apenas em memória, sem criar db.json)
const db = { 
  products: products.products,  // importa o array dentro de products.json
  users: users.users            // importa o array dentro de users.json
};

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log('✅ JSON Server rodando na porta ${PORT}');
  console.log('📦 Endpoints: /products , /users');
});