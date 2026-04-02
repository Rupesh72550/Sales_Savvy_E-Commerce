import axios from 'axios';

const API_BASE_URLS = {
  auth: 'http://localhost:8081/api',
  products: 'http://localhost:8082/api',
  orders: 'http://localhost:8083/api',
  payments: 'http://localhost:8084/api',
  admin: 'http://localhost:8085/api',
};

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  auth: {
    login: (creds) => api.post(`${API_BASE_URLS.auth}/auth/signin`, creds),
    signup: (data) => api.post(`${API_BASE_URLS.auth}/auth/signup`, data),
  },
  products: {
    getAll: () => api.get(`${API_BASE_URLS.products}/products`),
    getById: (id) => api.get(`${API_BASE_URLS.products}/products/${id}`),
    getByCategory: (catId) => api.get(`${API_BASE_URLS.products}/products/category/${catId}`),
    getRandom: () => api.get(`${API_BASE_URLS.products}/products/random`),
  },
  categories: {
    getAll: () => api.get(`${API_BASE_URLS.products}/categories`),
  },
  orders: {
    create: (data) => api.post(`${API_BASE_URLS.orders}/orders`, data),
    getByUser: (userId) => api.get(`${API_BASE_URLS.orders}/orders/user/${userId}`),
  },
  payments: {
    process: (data) => api.post(`${API_BASE_URLS.payments}/payments/process`, data),
  },
  admin: {
    getStats: () => api.get(`${API_BASE_URLS.admin}/admin/stats`),
  }
};
