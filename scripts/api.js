import { Platform } from 'react-native';
import axios from 'axios';

const baseURL = Platform.select({
  ios: 'http://192.168.0.15:8080',              // For iOS Simulator
  android: 'http://26.35.197.48:8080',       // For Android (real device or emulator)
  default: 'http://localhost:8080'           // Fallback
});

const api = axios.create({
  baseURL,
  timeout: 10000, // 10 seconds
});

export default {
  getPosts: () => api.get('/posts'),
  likePost: (id) => api.put(`/posts/${id}/like`),
  createPost: (post) => api.post('/posts', post),
};