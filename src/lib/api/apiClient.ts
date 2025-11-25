import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
});

apiClient.interceptors.request.use(config => {
  config.headers['X-Timestamp'] = new Date().toISOString();
  config.headers['X-Request-UUID'] = uuidv4();

  return config;
});

apiClient.interceptors.response.use(
  res => res.data,
  err => {
    if (err.response) {
      console.error('ошибка API:', err.response.status, err.response.data);
    }
    if (err.request) {
      console.error('Ошибка сети:', err.message);
    } else {
      console.error('Неизвестная ошибка:', err.message);
    }

    return Promise.reject(err);
  }
);
