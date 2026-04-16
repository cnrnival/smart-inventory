// npm i axios
import axios from 'axios';

export const axios_api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND ?? 'https://smart-inventory-ioeq.onrender.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});