import { v4 as uuidv4 } from 'uuid';

class Challenge {
  constructor({
    id = uuidv4(),
    title,
    description,
    targetCondition,
    targetValue,
    currentValue = 0,
    deadline = null,
    status = 'pending', // pending, in-progress, completed, accomplished
    badgeReward,
    pointsReward = 0,
    category,
    createdAt = new Date(),
    completedAt = null,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.targetCondition = targetCondition;
    this.targetValue = targetValue;
    this.currentValue = currentValue;
    this.deadline = deadline;
    this.status = status;
    this.badgeReward = badgeReward;
    this.pointsReward = pointsReward;
    this.category = category;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
  }

  updateProgress(newValue) {
    this.currentValue = newValue;
    
    // Auto-update status based on progress
    if (this.currentValue >= this.targetValue) {
      this.status = 'completed';
    } else if (this.currentValue > 0) {
      this.status = 'in-progress';
    }
    
    return this;
  }

  accomplish() {
    this.status = 'accomplished';
    this.completedAt = new Date();
    return this;
  }

  getProgressPercentage() {
    return Math.min(100, Math.round((this.currentValue / this.targetValue) * 100));
  }

  isExpired() {
    if (!this.deadline) return false;
    return new Date() > new Date(this.deadline);
  }
}

export default Challenge;