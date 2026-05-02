


 const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const productsPath = path.join(dirname, 'products.json');
const usersPath = path.join(dirname, 'users.json');

// Lê os arquivos separados
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

// Combina em um único objeto
const db = { ...products, ...users };

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Usa a porta do ambiente (Render) ou 3333 localmente
const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
 // console.log('JSON Server is running on port' ${PORT});
});