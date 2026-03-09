import express from 'express';
import { getStats } from '../controller/stats.js';

const router = express.Router();

// On crée la route GET /api/stats
// (Pas besoin d'être connecté pour voir les stats, donc on ne met pas 'auth')
router.get('/', getStats);

export default router;