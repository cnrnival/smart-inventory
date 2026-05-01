const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, 'products.json');
const usersPath = path.join(__dirname, 'users.json');
const dbPath = path.join(__dirname, 'db.json');

// Merge files into a temporary db.json for json-server to use
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

const db = { ...products, ...users };
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(3333, () => {
  console.log('JSON Server is running on port 3333');
});
