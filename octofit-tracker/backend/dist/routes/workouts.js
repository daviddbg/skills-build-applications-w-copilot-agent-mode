import { Router } from 'express';
import Workout from '../models/workout.js';
const router = Router();
router.get('/', async (_req, res) => {
    try {
        const workouts = await Workout.find().sort({ difficulty: 1, title: 1 }).lean();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts', details: String(error) });
    }
});
export default router;
