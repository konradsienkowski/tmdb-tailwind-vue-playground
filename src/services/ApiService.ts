// Import axios & extensions
import axios from 'axios';

// Create and export axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Cache-Control': 'no-cache',
    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
    'Content-Type': 'application/json;charset=utf-8'
  },
});
