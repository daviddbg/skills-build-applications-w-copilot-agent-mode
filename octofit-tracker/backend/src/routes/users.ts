import { Router } from 'express';
import User from '../models/user.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1, name: 1 }).lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', details: String(error) });
  }
});

export default router;