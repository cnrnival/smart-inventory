const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3333;

const productsPath = path.join(__dirname, 'products.json');
const usersPath = path.join(__dirname, 'users.json');

async function readProducts() {
  const data = await fs.readFile(productsPath, 'utf8');
  return JSON.parse(data);
}

async function writeProducts(data) {
  await fs.writeFile(productsPath, JSON.stringify(data, null, 2));
}

async function readUsers() {
  const data = await fs.readFile(usersPath, 'utf8');
  return JSON.parse(data);
}

async function writeUsers(data) {
  await fs.writeFile(usersPath, JSON.stringify(data, null, 2));
}

// Rota raiz com HTML moderno
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Smart Inventory API</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #f5f7fc 0%, #e9eef5 100%);
          min-height: 100vh;
          padding: 2rem 1rem;
        }
        .container { max-width: 1000px; margin: 0 auto; }
        .card {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(2px);
          border-radius: 2rem;
          padding: 2rem;
          box-shadow: 0 20px 35px -12px rgba(0,0,0,0.15);
          border: 1px solid rgba(107,157,255,0.2);
        }
        h1 {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #6b9dff, #a07aff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 0.5rem;
        }
        .sub { color: #4b5563; margin-bottom: 2rem; border-left: 3px solid #6b9dff; padding-left: 1rem; }
        .endpoints { display: flex; gap: 1.5rem; flex-wrap: wrap; margin: 2rem 0; }
        .endpoint-card {
          background: white;
          border-radius: 1.5rem;
          padding: 1.2rem 1.8rem;
          flex: 1;
          min-width: 180px;
          transition: all 0.2s ease;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -2px rgba(0,0,0,0.05);
        }
        .endpoint-card:hover {
          transform: translateY(-4px);
          border-color: #6b9dff;
          box-shadow: 0 12px 20px -10px rgba(107,157,255,0.3);
        }
        .endpoint-card a {
          text-decoration: none;
          font-weight: 700;
          font-size: 1.3rem;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .method {
          display: inline-block;
          background: #6b9dff20;
          color: #6b9dff;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 20px;
        }
        pre {
          background: #0f172a;
          color: #e2e8f0;
          padding: 1.2rem;
          border-radius: 1rem;
          overflow-x: auto;
          font-size: 0.85rem;
          margin-top: 1.5rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <h1>📦 Smart Inventory API</h1>
          <div class="sub">Interface moderna para acessar seus dados de estoque e usuários</div>
          <div class="endpoints">
            <div class="endpoint-card">
              <a href="/users">👥 /users <span class="method">GET</span></a>
              <div style="font-size:0.85rem; color:#475569; margin-top:0.4rem;">Lista de colaboradores</div>
            </div>
            <div class="endpoint-card">
              <a href="/products">📦 /products <span class="method">GET</span></a>
              <div style="font-size:0.85rem; color:#475569; margin-top:0.4rem;">Todos os produtos (FEFO)</div>
            </div>
          </div>
          <div style="margin-top: 2rem; border-top: 1px solid #e2e8f0; padding-top: 1.5rem;">
            <p style="color:#334155; font-weight:500;">💡 Clique em qualquer link acima para ver o JSON cru.</p>
            <pre style="background:#f1f5f9; color:#1e293b;">// Exemplo de requisição com fetch
fetch('/users')
  .then(res => res.json())
  .then(console.log);</pre>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Rotas
app.get('/users', async (req, res) => {
  try {
    const { email, password } = req.query;
    let { users } = await readUsers();
    if (email) users = users.filter(u => u.email === email);
    if (password) users = users.filter(u => u.password === password);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ler usuários' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const data = await readUsers();
    const newUser = { id: Math.random().toString(36).substr(2, 9), ...req.body };
    data.users.push(newUser);
    await writeUsers(data);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const data = await readUsers();
    data.users = data.users.filter(u => u.id !== req.params.id);
    await writeUsers(data);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const { products } = await readProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ler produtos' });
  }
});

app.post('/products', async (req, res) => {
  try {
    const data = await readProducts();
    const newProduct = { id: Math.random().toString(36).substr(2, 9), ...req.body };
    data.products.push(newProduct);
    await writeProducts(data);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const data = await readProducts();
    data.products = data.products.filter(p => p.id !== req.params.id);
    await writeProducts(data);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

app.listen(PORT, () => {
  console.log(`✨ API Smart Inventory rodando na porta ${PORT}`);
});