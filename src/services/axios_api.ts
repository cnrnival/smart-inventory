// npm i axios
import axios from 'axios';

export const axios_api = axios.create({
  baseURL: 'http://localhost:3333/', 
  headers: {
    'Content-Type': 'application/json',
  },
});