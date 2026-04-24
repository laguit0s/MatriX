import axios from 'axios';

// Cliente HTTP centralizado para todas as chamadas ao backend.
const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export default api;