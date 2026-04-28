import axios from 'axios';

// cliente http configurado para rotas do servidor node
const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// exporta o cliente auxiliar da api
export default api;