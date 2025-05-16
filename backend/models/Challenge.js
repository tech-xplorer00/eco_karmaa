const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  targetCondition: {
    type: String,
    required: [true, 'Please provide a target condition']
  },
  targetValue: {
    type: Number,
    required: [true, 'Please provide a target value']
  },
  currentValue: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'accomplished'],
    default: 'pending'
  },
  badgeReward: {
    type: String,
    required: [true, 'Please provide a badge reward']
  },
  pointsReward: {
    type: Number,
    required: [true, 'Please provide points reward'],
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Please provide a category']
  },
  deadline: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Method to check if challenge is expired
ChallengeSchema.methods.isExpired = function() {
  if (!this.deadline) return false;
  return new Date() > this.deadline;
};

// Method to get progress percentage
ChallengeSchema.methods.getProgressPercentage = function() {
  return Math.min(100, Math.round((this.currentValue / this.targetValue) * 100));
};

module.exports = mongoose.model('Challenge', ChallengeSchema); 