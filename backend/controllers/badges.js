const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all badges
// @route   GET /api/v1/badges
// @access  Public
exports.getBadges = asyncHandler(async (req, res, next) => {
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
  query = Badge.find(JSON.parse(queryStr));

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
    query = query.sort('name');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Badge.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const badges = await query;

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
    count: badges.length,
    pagination,
    data: badges
  });
});

// @desc    Get single badge
// @route   GET /api/v1/badges/:id
// @access  Public
exports.getBadge = asyncHandler(async (req, res, next) => {
  const badge = await Badge.findById(req.params.id);

  if (!badge) {
    return next(
      new ErrorResponse(`Badge not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: badge
  });
});

// @desc    Create new badge
// @route   POST /api/v1/badges
// @access  Private/Admin
exports.createBadge = asyncHandler(async (req, res, next) => {
  const badge = await Badge.create(req.body);

  res.status(201).json({
    success: true,
    data: badge
  });
});

// @desc    Update badge
// @route   PUT /api/v1/badges/:id
// @access  Private/Admin
exports.updateBadge = asyncHandler(async (req, res, next) => {
  const badge = await Badge.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!badge) {
    return next(
      new ErrorResponse(`Badge not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: badge
  });
});

// @desc    Delete badge
// @route   DELETE /api/v1/badges/:id
// @access  Private/Admin
exports.deleteBadge = asyncHandler(async (req, res, next) => {
  const badge = await Badge.findById(req.params.id);

  if (!badge) {
    return next(
      new ErrorResponse(`Badge not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if badge is being used by any challenge
  const userBadges = await UserBadge.find({ badge: req.params.id });
  
  if (userBadges.length > 0) {
    return next(
      new ErrorResponse(`Cannot delete badge as it's currently in use`, 400)
    );
  }

  await badge.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get user badges
// @route   GET /api/v1/badges/user
// @access  Private
exports.getUserBadges = asyncHandler(async (req, res, next) => {
  const userBadges = await UserBadge.find({ user: req.user.id })
    .populate('badge');

  res.status(200).json({
    success: true,
    count: userBadges.length,
    data: userBadges.map(ub => ub.badge)
  });
}); 