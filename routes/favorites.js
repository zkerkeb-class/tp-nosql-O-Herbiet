import express from 'express';
import auth from '../middleware/auth.js';
import { getFavorites, addFavorite, removeFavorite } from '../controller/favorites.js';

const router = express.Router();

// Toutes ces routes sont protégées par le middleware "auth" !
router.get('/', auth, getFavorites);
router.post('/:pokemonId', auth, addFavorite);
router.delete('/:pokemonId', auth, removeFavorite);

export default router;