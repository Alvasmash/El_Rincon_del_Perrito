/* Cliente HTTP centralizado con Axios e interceptor JWT */
import axios from 'axios';

const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/* Adjunta automáticamente el token JWT si existe sesión iniciada */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('rincon_perrito_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getApiErrorMessage(error, fallback = 'No se pudo conectar con el servidor.') {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.response?.status === 401) {
    return 'Tu sesión expiró o no estás autorizado.';
  }
  if (error?.response?.status === 403) {
    return 'No tienes permisos para realizar esta acción.';
  }
  return fallback;
}

export default apiClient;
