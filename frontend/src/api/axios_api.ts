import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || '';

export const axios_api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

if (process.env.NODE_ENV === 'development') {
  console.log('[API] URL:', baseURL || '(relativa)');
}