import api from './api';

const challengeService = {
  // Get all challenges
  getAllChallenges: async () => {
    const response = await api.get('/challenges');
    return response.data;
  },
  
  // Get a specific challenge by ID
  getChallenge: async (id) => {
    const response = await api.get(`/challenges/${id}`);
    return response.data;
  },
  
  // Create a new challenge
  createChallenge: async (challengeData) => {
    const response = await api.post('/challenges', challengeData);
    return response.data;
  },
  
  // Join a challenge (this would be implemented in the backend)
  joinChallenge: async (id) => {
    const response = await api.post(`/challenges/${id}/join`);
    return response.data;
  },
  
  // Update challenge progress
  updateProgress: async (id, progressData) => {
    const response = await api.put(`/challenges/${id}/progress`, progressData);
    return response.data;
  },
  
  // Complete a challenge
  completeChallenge: async (id) => {
    const response = await api.put(`/challenges/${id}/accomplish`);
    return response.data;
  },
  
  // Get user's challenges (this uses the filter in the backend)
  getUserChallenges: async () => {
    const response = await api.get('/challenges');
    return response.data;
  }
};

export default challengeService; 