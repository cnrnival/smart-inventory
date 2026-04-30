// npm i axios
import axios from 'axios';

export const axios_api = axios.create({
  baseURL: 'https://smart-inventory-api.onrender.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});