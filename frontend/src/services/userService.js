import api from './api';

const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  
  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
  
  // Update user password
  updatePassword: async (passwordData) => {
    const response = await api.put('/users/updatepassword', passwordData);
    return response.data;
  },
  
  // Get user stats (points, level, etc.)
  getUserStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  }
};

export default userService; 