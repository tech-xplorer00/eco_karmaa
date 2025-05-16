const Reward = require('../models/Reward');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all rewards
// @route   GET /api/v1/rewards
// @access  Public
exports.getRewards = asyncHandler(async (req, res, next) => {
  let query;
  
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Reward.find(JSON.parse(queryStr));

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-pointsValue');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Reward.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const rewards = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: rewards.length,
    pagination,
    data: rewards
  });
});

// @desc    Get single reward
// @route   GET /api/v1/rewards/:id
// @access  Public
exports.getReward = asyncHandler(async (req, res, next) => {
  const reward = await Reward.findById(req.params.id);

  if (!reward) {
    return next(
      new ErrorResponse(`Reward not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: reward
  });
});

// @desc    Create new reward
// @route   POST /api/v1/rewards
// @access  Private/Admin
exports.createReward = asyncHandler(async (req, res, next) => {
  const reward = await Reward.create(req.body);

  res.status(201).json({
    success: true,
    data: reward
  });
});

// @desc    Update reward
// @route   PUT /api/v1/rewards/:id
// @access  Private/Admin
exports.updateReward = asyncHandler(async (req, res, next) => {
  const reward = await Reward.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!reward) {
    return next(
      new ErrorResponse(`Reward not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: reward
  });
});

// @desc    Delete reward
// @route   DELETE /api/v1/rewards/:id
// @access  Private/Admin
exports.deleteReward = asyncHandler(async (req, res, next) => {
  const reward = await Reward.findById(req.params.id);

  if (!reward) {
    return next(
      new ErrorResponse(`Reward not found with id of ${req.params.id}`, 404)
    );
  }

  await reward.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get user rewards
// @route   GET /api/v1/rewards/user
// @access  Private
exports.getUserRewards = asyncHandler(async (req, res, next) => {
  const rewards = await Reward.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: rewards.length,
    data: rewards
  });
});

// @desc    Redeem reward
// @route   PUT /api/v1/rewards/:id/redeem
// @access  Private
exports.redeemReward = asyncHandler(async (req, res, next) => {
  let reward = await Reward.findById(req.params.id);

  if (!reward) {
    return next(
      new ErrorResponse(`Reward not found with id of ${req.params.id}`, 404)
    );
  }

  // Create a user-specific reward if it doesn't exist
  let userReward = await Reward.findOne({
    user: req.user.id,
    name: reward.name
  });

  if (!userReward) {
    // Check if user has enough points
    const user = await User.findById(req.user.id);
    
    if (user.points < reward.pointsValue) {
      return next(
        new ErrorResponse(`Not enough points to redeem this reward`, 400)
      );
    }

    // Deduct points
    await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { points: -reward.pointsValue } },
      { new: true }
    );

    // Create user reward
    userReward = await Reward.create({
      ...reward.toObject(),
      _id: undefined,
      user: req.user.id,
      earnedAt: Date.now()
    });
  } else if (userReward.isRedeemed) {
    return next(
      new ErrorResponse(`This reward has already been redeemed`, 400)
    );
  }

  // Mark as redeemed
  userReward.isRedeemed = true;
  await userReward.save();

  res.status(200).json({
    success: true,
    data: userReward
  });
}); 