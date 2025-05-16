const express = require('express');
const {
  getRewards,
  getReward,
  createReward,
  updateReward,
  deleteReward,
  getUserRewards,
  redeemReward
} = require('../controllers/rewards');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/')
  .get(getRewards)
  .post(protect, createReward);

// User specific routes should come before parameterized routes
router.get('/user', protect, getUserRewards);
router.put('/:id/redeem', protect, redeemReward);

router.route('/:id')
  .get(getReward)
  .put(protect, updateReward)
  .delete(protect, deleteReward);

module.exports = router; 