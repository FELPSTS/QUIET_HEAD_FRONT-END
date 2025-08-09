import { Platform } from 'react-native';
import axios from 'axios';

const api = axios.create({
  baseURL: Platform.select({
    ios: 'http://192.168.0.15:8080',        
    android: 'http://26.35.197.48:8080',   
    default: 'http://localhost:8080'      
  }),
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json'
  }
});

export const ClientAPI = {
  create: (clientData) => api.post('/clients', clientData),
};

export default {
  ...ClientAPI,
  getPosts: () => api.get('/posts'),
  likePost: (id) => api.put(`/posts/${id}/like`),
  createPost: (post) => api.post('/posts', post),
  // Adicione outros endpoints conforme necessário
};