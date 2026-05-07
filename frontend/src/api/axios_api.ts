// frontend/src/api/axios_api.ts
import axios from 'axios';

// Se a variável NEXT_PUBLIC_API_URL estiver definida, usa ela; senão, usa string vazia (relativa)
// Em produção no Render, deixaremos vazio para chamar o mesmo servidor
const baseURL = process.env.NEXT_PUBLIC_API_URL || '';

export const axios_api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// Log apenas em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  console.log('[API] URL:', baseURL || '(relativa ao domínio atual)');
}