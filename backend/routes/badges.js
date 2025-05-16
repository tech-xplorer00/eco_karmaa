const express = require('express');
const {
  getBadges,
  getBadge,
  createBadge,
  updateBadge,
  deleteBadge,
  getUserBadges
} = require('../controllers/badges');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/')
  .get(getBadges)
  .post(protect, createBadge);

router.get('/user', protect, getUserBadges);

router.route('/:id')
  .get(getBadge)
  .put(protect, updateBadge)
  .delete(protect, deleteBadge);

module.exports = router; 