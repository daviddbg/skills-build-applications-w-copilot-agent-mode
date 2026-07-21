import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.insertMany([
      {
        name: 'Maya Patel',
        email: 'maya.patel@octofit.app',
        age: 29,
        fitnessLevel: 'advanced',
        totalPoints: 640
      },
      {
        name: 'Ethan Brooks',
        email: 'ethan.brooks@octofit.app',
        age: 34,
        fitnessLevel: 'intermediate',
        totalPoints: 520
      },
      {
        name: 'Nora Kim',
        email: 'nora.kim@octofit.app',
        age: 26,
        fitnessLevel: 'beginner',
        totalPoints: 380
      }
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Stride Syndicate',
        city: 'Seattle',
        memberIds: [users[0]._id, users[2]._id],
        weeklyPoints: 880
      },
      {
        name: 'Iron Pulse',
        city: 'Austin',
        memberIds: [users[1]._id],
        weeklyPoints: 520
      }
    ]);

    await User.updateOne({ _id: users[0]._id }, { teamId: teams[0]._id });
    await User.updateOne({ _id: users[1]._id }, { teamId: teams[1]._id });
    await User.updateOne({ _id: users[2]._id }, { teamId: teams[0]._id });

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'run',
        durationMinutes: 46,
        caloriesBurned: 515,
        loggedAt: new Date('2026-07-18T07:15:00Z')
      },
      {
        userId: users[1]._id,
        type: 'strength',
        durationMinutes: 55,
        caloriesBurned: 470,
        loggedAt: new Date('2026-07-19T12:10:00Z')
      },
      {
        userId: users[2]._id,
        type: 'walk',
        durationMinutes: 38,
        caloriesBurned: 210,
        loggedAt: new Date('2026-07-20T18:45:00Z')
      }
    ]);

    await Workout.insertMany([
      {
        userId: users[0]._id,
        title: 'Tempo 5K Builder',
        focusArea: 'Endurance',
        exercises: ['Warm-up jog', 'Tempo intervals', 'Cooldown stretch'],
        targetDurationMinutes: 50,
        difficulty: 'advanced'
      },
      {
        userId: users[1]._id,
        title: 'Upper Body Power',
        focusArea: 'Strength',
        exercises: ['Bench press', 'Bent-over rows', 'Plank finisher'],
        targetDurationMinutes: 60,
        difficulty: 'intermediate'
      },
      {
        userId: users[2]._id,
        title: 'Starter Mobility Flow',
        focusArea: 'Mobility',
        exercises: ['Cat-cow', 'Hip openers', 'Bodyweight squats'],
        targetDurationMinutes: 30,
        difficulty: 'beginner'
      }
    ]);

    await Leaderboard.insertMany([
      {
        scope: 'user',
        referenceId: users[0]._id,
        displayName: users[0].name,
        points: 640,
        rank: 1,
        periodLabel: 'Week 29 2026'
      },
      {
        scope: 'user',
        referenceId: users[1]._id,
        displayName: users[1].name,
        points: 520,
        rank: 2,
        periodLabel: 'Week 29 2026'
      },
      {
        scope: 'team',
        referenceId: teams[0]._id,
        displayName: teams[0].name,
        points: 880,
        rank: 1,
        periodLabel: 'Week 29 2026'
      },
      {
        scope: 'team',
        referenceId: teams[1]._id,
        displayName: teams[1].name,
        points: 520,
        rank: 2,
        periodLabel: 'Week 29 2026'
      }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
