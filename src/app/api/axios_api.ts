// npm i axios
import axios from 'axios';

export const axios_api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND ?? 'http://localhost:3333/', 
  headers: {
    'Content-Type': 'application/json',
  },
});