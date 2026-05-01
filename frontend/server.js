const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, 'products.json');
const usersPath = path.join(__dirname, 'users.json');

// Carrega os dados iniciais dos arquivos separados
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

// Cria o objeto de banco de dados na memória
const db = { ...productsData, ...usersData };

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Middleware customizado para persistir alterações nos arquivos separados
server.use((req, res, next) => {
    const originalSend = res.send;
    
    res.send = function (body) {
        // Se a requisição for de alteração (POST, PUT, PATCH, DELETE)
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
            try {
                // Salva a parte de produtos no arquivo de produtos
                fs.writeFileSync(productsPath, JSON.stringify(db.products, null, 2));
                // Salva a parte de usuários no arquivo de usuários
                fs.writeFileSync(usersPath, JSON.stringify(db.users, null, 2));
                console.log(`[${req.method}] Alterações persistidas em products.json e users.json`);
            } catch (err) {
                console.error('Erro ao salvar arquivos:', err);
            }
        }
        return originalSend.call(this, body);
    };
    next();
});

server.use(router);

server.listen(3333, () => {
    console.log('JSON Server is running on port 3333');
    console.log('Now persisting changes directly to products.json and users.json');
});
