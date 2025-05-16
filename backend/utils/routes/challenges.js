const express = require('express');
const {
  getChallenges,
  getChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  updateProgress,
  accomplishChallenge
} = require('../controllers/challenges');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getChallenges)
  .post(protect, createChallenge);

router.route('/:id')
  .get(protect, getChallenge)
  .put(protect, updateChallenge)
  .delete(protect, deleteChallenge);

router.put('/:id/progress', protect, updateProgress);
router.put('/:id/accomplish', protect, accomplishChallenge);

module.exports = router; 