import express from 'express';
import { addToTeam } from '../controller/team.js';
import auth from '../middleware/auth.js'; // Le vigile du Token !

const router = express.Router();

// Route POST pour ajouter un Pokémon à l'équipe (protégée par 'auth')
router.post('/:id', auth, addToTeam);

export default router;