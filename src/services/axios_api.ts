// npm i axios
import axios from 'axios';

export const axios_api = axios.create({
  baseURL: '', 
  headers: {
    'Content-Type': 'application/json',
  },
});