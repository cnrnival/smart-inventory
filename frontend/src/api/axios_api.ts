// frontend/src/api/axios_api.ts
import axios from 'axios';

export const axios_api = axios.create({
<<<<<<< HEAD
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'https://smart-inventory-api-xiul.onrender.com/',
  headers: { 'Content-Type': 'application/json' },
});

console.log('[API] URL:', axios_api.defaults.baseURL);
=======
  baseURL: 'https://smart-inventory-5zwz.onrender.com', // ❌ CORRETO? Sim, mas falta /api? Não, json-server não usa /api
  headers: { 'Content-Type': 'application/json' },
});
>>>>>>> parent of f30324b (fix: Atualiza URL da API para o novo endpoint no Render)
