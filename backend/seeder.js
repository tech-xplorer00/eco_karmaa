const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const User = require('./models/User');
const Badge = require('./models/Badge');
const Challenge = require('./models/Challenge');
const Reward = require('./models/Reward');
const UserBadge = require('./models/UserBadge');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const badges = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/badges.json`, 'utf-8')
);

const challenges = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/challenges.json`, 'utf-8')
);

const rewards = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/rewards.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);
    await Badge.create(badges);
    await Challenge.create(challenges);
    await Reward.create(rewards);
    
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Badge.deleteMany();
    await Challenge.deleteMany();
    await Reward.deleteMany();
    await UserBadge.deleteMany();
    
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please add proper flag: -i (import) or -d (delete)'.yellow);
  process.exit();
}