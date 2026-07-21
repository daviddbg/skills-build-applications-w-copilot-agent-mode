import { Router } from 'express';
import Team from '../models/team.js';
const router = Router();
router.get('/', async (_req, res) => {
    try {
        const teams = await Team.find().sort({ weeklyPoints: -1, name: 1 }).lean();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams', details: String(error) });
    }
});
export default router;
