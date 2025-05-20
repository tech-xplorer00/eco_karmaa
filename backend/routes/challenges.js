const express = require('express');
const {
  getChallenges,
  getChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  updateProgress,
  accomplishChallenge,
  joinChallenge,
  startChallenge
} = require('../controllers/challenges');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getChallenges)
  .post(protect, createChallenge);

router.route('/:id')
  .get(protect, getChallenge)
  .put(protect, updateChallenge)
  .delete(protect, deleteChallenge);

// Admin routes
router.put('/:id/progress', protect, authorize('admin'), updateProgress);

router.put('/:id/accomplish', protect, accomplishChallenge);
router.post('/:id/join', protect, joinChallenge);
router.patch('/:id/start', protect, startChallenge);

module.exports = router; 