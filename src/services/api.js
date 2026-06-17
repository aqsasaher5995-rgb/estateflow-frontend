import axios from 'axios';

const API_URL = 'https://estateflow-backend-mt7ox7s2k6wllj-aqsasaher5995-rgbs-projects.vercel.app';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;