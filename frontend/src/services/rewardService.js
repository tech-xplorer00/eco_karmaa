import api from './api';

const rewardService = {
  // Get all rewards
  getAllRewards: async () => {
    const response = await api.get('/rewards');
    return response.data;
  },
  
  // Get a specific reward by ID
  getReward: async (id) => {
    const response = await api.get(`/rewards/${id}`);
    return response.data;
  },
  
  // Redeem a reward
  redeemReward: async (id) => {
    const response = await api.put(`/rewards/${id}/redeem`);
    return response.data;
  },
  
  // Get user's redeemed rewards
  getUserRewards: async () => {
    const response = await api.get('/rewards/user');
    return response.data;
  }
};

export default rewardService; 