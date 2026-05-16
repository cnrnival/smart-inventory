const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3333;

// Caminhos dos arquivos JSON (dentro da mesma pasta)
const productsPath = path.join(__dirname, 'products.json');
const usersPath = path.join(__dirname, 'users.json');

// Funções auxiliares
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

// Rota raiz: página HTML com links visuais
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Smart Inventory API</title>
      <style>
        body {
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
          max-width: 900px;
          margin: 2rem auto;
          padding: 0 1rem;
          background: #f5f7fb;
          color: #1e293b;
        }
        h1 {
          color: #6b9dff;
          border-bottom: 2px solid #6b9dff;
          display: inline-block;
          padding-bottom: 0.25rem;
        }
        .card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          padding: 1.5rem;
          margin: 1.5rem 0;
        }
        .endpoint {
          background: #f1f5f9;
          border-left: 4px solid #6b9dff;
          padding: 0.75rem 1rem;
          margin: 1rem 0;
          border-radius: 0.5rem;
        }
        a {
          text-decoration: none;
          font-weight: 600;
          color: #6b9dff;
          font-size: 1.1rem;
        }
        a:hover {
          text-decoration: underline;
        }
        pre {
          background: #0f172a;
          color: #e2e8f0;
          padding: 1rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          font-size: 0.85rem;
        }
        button {
          background: #6b9dff;
          border: none;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        button:hover {
          background: #5a8bec;
        }
      </style>
    </head>
    <body>
      <h1>📦 Smart Inventory API</h1>
      <div class="card">
        <p>Clique nos botões abaixo para visualizar os dados:</p>
        <div class="endpoint">
          <a href="/users">👥 /users</a> – Lista de usuários cadastrados
        </div>
        <div class="endpoint">
          <a href="/products">📄 /products</a> – Lista de produtos em estoque
        </div>
      </div>

      <div class="card">
        <h2>📋 Visualizador rápido</h2>
        <button id="btnUsers">Carregar Usuários</button>
        <button id="btnProducts">Carregar Produtos</button>
        <pre id="output">Clique em um botão para ver os dados aqui...</pre>
      </div>

      <script>
        const output = document.getElementById('output');
        
        async function fetchData(url, label) {
          output.textContent = '⏳ Carregando...';
          try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(\`Erro \${res.status}\`);
            const data = await res.json();
            output.textContent = JSON.stringify(data, null, 2);
          } catch (err) {
            output.textContent = \`❌ Erro ao carregar \${label}: \${err.message}\`;
          }
        }

        document.getElementById('btnUsers').onclick = () => fetchData('/users', 'usuários');
        document.getElementById('btnProducts').onclick = () => fetchData('/products', 'produtos');
      </script>
    </body>
    </html>
  `);
});

// ========== ROTAS DA API ==========
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
=======
app.use(cors()); // Permite que o frontend acesse a API
app.use(express.json()); // Habilita o recebimento de JSON no corpo das requisições
 
// Ele tentará ler a porta do sistema; se não houver, usa a 3333 (para seu teste local).
=======
>>>>>>> parent of 14b757b (resolve build errors, refactor auth context and implement FEFO logic)
=======
>>>>>>> parent of 14b757b (resolve build errors, refactor auth context and implement FEFO logic)
const PORT = process.env.PORT || 3333;

// Caminhos dos seus arquivos
const productsPath = path.join(__dirname, 'products.json');
const usersPath = path.join(__dirname, 'users.json');

// Lê os dados uma vez (para não ler a cada requisição – mas pode ser melhorado depois)
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

<<<<<<< HEAD
<<<<<<< HEAD
// Endpoints
=======
// Rota raiz (mensagem informativa)
>>>>>>> parent of f7342c4 (fix: corrige rotas /users e /products e atualiza server.js)
=======
// Rota raiz (mensagem informativa)
>>>>>>> parent of f7342c4 (fix: corrige rotas /users e /products e atualiza server.js)
app.get('/', (req, res) => {
  res.send('API Smart Inventory - endpoints disponíveis: /users, /products');
});

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
app.post('/users', (req, res) => {
  const data = readData(usersPath);
  const newUser = { 
    id: Math.random().toString(36).substr(2, 9), 
    ...req.body 
  };
  data.users.push(newUser);
  saveData(usersPath, data);
>>>>>>> parent of eb91c8e (add internal API routes and next.config.js for Render deployment)
  res.status(201).json(newUser);
});

app.delete('/users/:id', (req, res) => {
<<<<<<< HEAD
  const data = readUsers();
  data.users = data.users.filter(u => u.id !== req.params.id);
  writeUsers(data);
  res.status(204).send();
});

app.get('/products', (req, res) => {
  const { products } = readProducts();
=======
  const data = readData(usersPath);
  data.users = data.users.filter(u => u.id !== req.params.id);
  saveData(usersPath, data);
  res.status(204).send();
});

// --- ROTAS DE PRODUTOS ---

app.get('/products', (req, res) => {
  const { products } = readData(productsPath);
>>>>>>> parent of eb91c8e (add internal API routes and next.config.js for Render deployment)
  res.json(products);
});

app.post('/products', (req, res) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> parent of eb91c8e (add internal API routes and next.config.js for Render deployment)
=======
// Rota de Produtos
=======
>>>>>>> parent of 851af1b (up)
=======
// Rota 
>>>>>>> parent of f7342c4 (fix: corrige rotas /users e /products e atualiza server.js)
=======
// Rota 
>>>>>>> parent of f7342c4 (fix: corrige rotas /users e /products e atualiza server.js)
app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/users', (req, res) => {
  res.json(users);
});
app.listen(PORT, () => {
  console.log(`✅ API rodando na porta ${PORT}`);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  console.log(`📦 Endpoints: /products , /users`);
});
>>>>>>> parent of 14b757b (resolve build errors, refactor auth context and implement FEFO logic)
=======
// Rota de Produtos
=======
>>>>>>> parent of 851af1b (up)
=======
// Rota 
>>>>>>> parent of f7342c4 (fix: corrige rotas /users e /products e atualiza server.js)
app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/users', (req, res) => {
  res.json(users);
});
<<<<<<< HEAD

=======
>>>>>>> parent of f9181ad (up)
app.listen(PORT, () => {
  console.log(`✅ API rodando na porta ${PORT}`);
<<<<<<< HEAD
  console.log(`📦 Endpoints: /products , /users`);
});
>>>>>>> parent of 14b757b (resolve build errors, refactor auth context and implement FEFO logic)
=======
});
>>>>>>> parent of 851af1b (up)
=======
});
>>>>>>> parent of 851af1b (up)
=======
  console.log(`📦 Endpoints: /products , /users`);
});
>>>>>>> parent of f7342c4 (fix: corrige rotas /users e /products e atualiza server.js)
=======
app.listen(PORT, () => {
  console.log(`✅ API rodando na porta ${PORT}`);
  console.log(`📦 Endpoints: /products , /users`);
});
>>>>>>> parent of f7342c4 (fix: corrige rotas /users e /products e atualiza server.js)
=======
  console.log(`📦 Endpoints: /products , /users`);
});
>>>>>>> parent of f7342c4 (fix: corrige rotas /users e /products e atualiza server.js)
