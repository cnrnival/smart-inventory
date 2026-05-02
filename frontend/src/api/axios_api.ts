// frontend/src/api/axios_api.ts
import axios from 'axios';

 export const axios_api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'https://smart-inventory-api-xiul.onrender.com/',
  headers: { 'Content-Type': 'application/json' },
});

console.log('[API] URL:', axios_api.defaults.baseURL);