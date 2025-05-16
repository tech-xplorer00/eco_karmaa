import { v4 as uuidv4 } from 'uuid';

class Reward {
  constructor({
    id = uuidv4(),
    name,
    description,
    icon,
    category,
    pointsValue = 0,
    rarity = 'common', // common, uncommon, rare, epic, legendary
    earnedAt = new Date(),
    isRedeemed = false
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.category = category;
    this.pointsValue = pointsValue;
    this.rarity = rarity;
    this.earnedAt = earnedAt;
    this.isRedeemed = isRedeemed;
  }

  redeem() {
    this.isRedeemed = true;
    return this;
  }

  getFormattedDate() {
    return this.earnedAt.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }
}

export default Reward;