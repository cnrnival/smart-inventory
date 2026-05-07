import axios from 'axios';

// URL base da API mock no Render
const baseURL = 'https://smart-inventory-api-xiul.onrender.com';

export const axios_api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});