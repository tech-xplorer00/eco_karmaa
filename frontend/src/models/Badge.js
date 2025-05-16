import { v4 as uuidv4 } from 'uuid';

class Badge {
  constructor({
    id = uuidv4(),
    name,
    description,
    icon,
    category,
    rarity = 'common', // common, uncommon, rare, epic, legendary
    earnedAt = new Date(),
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.category = category;
    this.rarity = rarity;
    this.earnedAt = earnedAt;
  }
}

export default Badge;