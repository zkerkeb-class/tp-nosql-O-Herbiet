import { Router } from 'express';
import PokemonsController from '../controller/pokemons.js';

// On importe notre videur
import auth from '../middleware/auth.js'; 

const router = Router();

// --- ROUTES PUBLIQUES (Tout le monde peut entrer) ---
router.get('/', PokemonsController.getallPokemons);
router.get('/:id', PokemonsController.getPokemonById);

// --- ROUTES PROTÉGÉES (On intercale le videur "auth" au milieu) ---
// Si "auth" ne dit pas "next()", le PokemonsController ne sera jamais exécuté !
router.post('/', auth, PokemonsController.createPokemon);
router.put('/:id', auth, PokemonsController.updatePokemon);
router.delete('/:id', auth, PokemonsController.deletePokemon);

export default router;