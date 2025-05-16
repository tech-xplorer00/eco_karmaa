import api from './api';

const authService = {
  // Register a new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  
  // Login an existing user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  
  // Logout the current user
  logout: async () => {
    const response = await api.get('/auth/logout');
    localStorage.removeItem('token');
    return response.data;
  },
  
  // Get current user details
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('token') ? true : false;
  }
};

export default authService; 