import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const APP_TOKEN = import.meta.env.VITE_API_APP_TOKEN;

// Cliente Axios con interceptores
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-token': APP_TOKEN, // 🔑 Token de la app (siempre)
  },
});

// Interceptor de REQUEST: inyecta el Bearer del usuario si existe
apiClient.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('user_token');
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de RESPONSE: manejo global de errores 401 / 403
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Token expirado o inválido → limpiar y mandar a login
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_data');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    if (status === 403) {
      alert('Acceso restringido: no tienes permisos para esta acción.');
    }

    if (status === 404) {
      alert('Recurso no encontrado.');
    }

    if (status === 500) {
      alert('Error del servidor. Intenta más tarde.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;