import api from './api';

const badgeService = {
  // Get all badges
  getAllBadges: async () => {
    const response = await api.get('/badges');
    return response.data;
  },
  
  // Get a specific badge by ID
  getBadge: async (id) => {
    const response = await api.get(`/badges/${id}`);
    return response.data;
  },
  
  // Get user's earned badges
  getUserBadges: async () => {
    const response = await api.get('/badges/user');
    return response.data;
  }
};

export default badgeService; 