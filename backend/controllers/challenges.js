const Challenge = require('../models/Challenge');
const User = require('../models/User');
const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all challenges
// @route   GET /api/v1/challenges
// @access  Private
exports.getChallenges = asyncHandler(async (req, res, next) => {
  // Add filter for user's challenges only
  req.query.user = req.user.id;
  
  // Query with filtering
  let query;
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Challenge.find(JSON.parse(queryStr));

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
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Challenge.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const challenges = await query;

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
    count: challenges.length,
    pagination,
    data: challenges
  });
});

// @desc    Get single challenge
// @route   GET /api/v1/challenges/:id
// @access  Private
exports.getChallenge = asyncHandler(async (req, res, next) => {
  const challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    return next(
      new ErrorResponse(`Challenge not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is the challenge owner
  if (challenge.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to access this challenge`, 401)
    );
  }

  res.status(200).json({
    success: true,
    data: challenge
  });
});

// @desc    Create new challenge
// @route   POST /api/v1/challenges
// @access  Private
exports.createChallenge = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const challenge = await Challenge.create(req.body);

  res.status(201).json({
    success: true,
    data: challenge
  });
});

// @desc    Update challenge
// @route   PUT /api/v1/challenges/:id
// @access  Private
exports.updateChallenge = asyncHandler(async (req, res, next) => {
  let challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    return next(
      new ErrorResponse(`Challenge not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is the challenge owner
  if (challenge.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this challenge`, 401)
    );
  }

  challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: challenge
  });
});

// @desc    Delete challenge
// @route   DELETE /api/v1/challenges/:id
// @access  Private
exports.deleteChallenge = asyncHandler(async (req, res, next) => {
  const challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    return next(
      new ErrorResponse(`Challenge not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is the challenge owner
  if (challenge.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this challenge`, 401)
    );
  }

  await challenge.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Update challenge progress
// @route   PUT /api/v1/challenges/:id/progress
// @access  Private
exports.updateProgress = asyncHandler(async (req, res, next) => {
  const { currentValue } = req.body;

  if (currentValue === undefined) {
    return next(new ErrorResponse('Please provide a current value', 400));
  }

  let challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    return next(
      new ErrorResponse(`Challenge not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is the challenge owner
  if (challenge.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this challenge`, 401)
    );
  }

  // Update challenge status based on progress
  challenge.currentValue = currentValue;
  
  if (currentValue >= challenge.targetValue) {
    challenge.status = 'completed';
  } else if (currentValue > 0) {
    challenge.status = 'in-progress';
  } else {
    challenge.status = 'pending';
  }

  await challenge.save();

  res.status(200).json({
    success: true,
    data: challenge
  });
});

// @desc    Accomplish a challenge
// @route   PUT /api/v1/challenges/:id/accomplish
// @access  Private
exports.accomplishChallenge = asyncHandler(async (req, res, next) => {
  let challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    return next(
      new ErrorResponse(`Challenge not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is the challenge owner
  if (challenge.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this challenge`, 401)
    );
  }

  // Check if challenge is completed
  if (challenge.status !== 'completed') {
    return next(
      new ErrorResponse(`Challenge must be completed before accomplishing`, 400)
    );
  }

  // Update challenge status
  challenge.status = 'accomplished';
  challenge.completedAt = Date.now();
  await challenge.save();

  // Add badge to user
  const badge = await Badge.findOne({ name: challenge.badgeReward });
  
  if (!badge) {
    return next(
      new ErrorResponse(`Badge not found with name ${challenge.badgeReward}`, 404)
    );
  }

  // Check if user already has this badge
  const existingBadge = await UserBadge.findOne({
    user: req.user.id,
    badge: badge._id
  });

  if (!existingBadge) {
    await UserBadge.create({
      user: req.user.id,
      badge: badge._id
    });
  }

  // Add points to user
  await User.findByIdAndUpdate(
    req.user.id,
    { $inc: { points: challenge.pointsReward } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: challenge,
    badge
  });
}); 