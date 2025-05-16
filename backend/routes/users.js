const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  getUserStats
} = require('../controllers/users');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/updatepassword', protect, updatePassword);
router.get('/stats', protect, getUserStats);

module.exports = router; 