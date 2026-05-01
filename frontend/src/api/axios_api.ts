// frontend/src/api/axios_api.ts
import axios from 'axios';

export const axios_api = axios.create({
  baseURL: 'https://smart-inventory-5zwz.onrender.com',   // ← URL atualizada
  headers: {
    'Content-Type': 'application/json',
  },
});