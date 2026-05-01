// frontend/src/api/axios_api.ts
import axios from 'axios';

export const axios_api = axios.create({
  baseURL: 'https://smart-inventory-5zwz.onrender.com', // ❌ CORRETO? Sim, mas falta /api? Não, json-server não usa /api
  headers: { 'Content-Type': 'application/json' },
});