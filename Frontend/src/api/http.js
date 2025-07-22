import axios from 'axios';

const baseURL =
  process.env.REACT_APP_API_URL ||        // CRA / Webpack
  process.env.VITE_API_URL       ||        // Vite
 'https://admin.api.nammellaramysuru.in/api/v1/'; 

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true   // send cookies if you’re using refresh tokens
});

// -- attach the JWT to every request (if present) --
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('accessToken');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
