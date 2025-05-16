const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  // Only allow certain fields to be updated
  const fieldsToUpdate = {
    name: req.body.name
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update password
// @route   PUT /api/v1/users/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully'
  });
});

// @desc    Get user stats
// @route   GET /api/v1/users/stats
// @access  Private
exports.getUserStats = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  // Calculate user level based on points
  let level = 'Eco Beginner';
  if (user.points >= 5000) {
    level = 'Eco Master';
  } else if (user.points >= 2500) {
    level = 'Eco Expert';
  } else if (user.points >= 1000) {
    level = 'Eco Enthusiast';
  } else if (user.points >= 500) {
    level = 'Eco Advocate';
  }

  // Update user level if changed
  if (level !== user.level) {
    user.level = level;
    await user.save();
  }

  res.status(200).json({
    success: true,
    data: {
      points: user.points,
      level: user.level
    }
  });
}); 