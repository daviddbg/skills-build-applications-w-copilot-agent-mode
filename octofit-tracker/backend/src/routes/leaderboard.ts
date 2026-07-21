import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard', details: String(error) });
  }
});

export default router;