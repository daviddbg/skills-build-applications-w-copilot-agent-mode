import { Router } from 'express';
import Activity from '../models/activity.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find().sort({ loggedAt: -1 }).lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities', details: String(error) });
  }
});

export default router;