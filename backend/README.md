# Eco Karmaa Backend API

> Backend API for the Eco Karmaa application, which helps users track eco-friendly challenges, earn badges, and redeem rewards.

## Usage

Rename ".env.example" to ".env" and update the values/settings to your own.

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Database Seeding

To seed the database with sample users, badges, challenges, and rewards:

```
# Import all data
node seeder -i

# Destroy all data
node seeder -d
```

## API Documentation

### Authentication Routes

```
POST /api/v1/auth/register - Register user
POST /api/v1/auth/login - Login user
GET /api/v1/auth/me - Get current logged in user
GET /api/v1/auth/logout - Logout user
```

### User Routes

```
GET /api/v1/users/profile - Get user profile
PUT /api/v1/users/profile - Update user profile
PUT /api/v1/users/updatepassword - Update password
GET /api/v1/users/stats - Get user stats (points, level)
```

### Challenge Routes

```
GET /api/v1/challenges - Get all challenges for logged in user
GET /api/v1/challenges/:id - Get single challenge
POST /api/v1/challenges - Create new challenge
PUT /api/v1/challenges/:id - Update challenge
DELETE /api/v1/challenges/:id - Delete challenge
PUT /api/v1/challenges/:id/progress - Update challenge progress
PUT /api/v1/challenges/:id/accomplish - Accomplish a challenge
```

### Badge Routes

```
GET /api/v1/badges - Get all badges
GET /api/v1/badges/:id - Get single badge
POST /api/v1/badges - Create new badge (admin)
PUT /api/v1/badges/:id - Update badge (admin)
DELETE /api/v1/badges/:id - Delete badge (admin)
GET /api/v1/badges/user - Get user badges
```

### Reward Routes

```
GET /api/v1/rewards - Get all rewards
GET /api/v1/rewards/:id - Get single reward
POST /api/v1/rewards - Create new reward (admin)
PUT /api/v1/rewards/:id - Update reward (admin)
DELETE /api/v1/rewards/:id - Delete reward (admin)
GET /api/v1/rewards/user - Get user rewards
PUT /api/v1/rewards/:id/redeem - Redeem a reward
``` 