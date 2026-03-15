// controller/pokemons.js
import Pokemon from '../schema/pokemon.js';

const PokemonsController = {
    
    // =========================================================
    // PARTIE 4 : getallPokemons (Filtres, Tri et Pagination)
    // =========================================================
    getallPokemons: async (req, res) => {
        try {
            // On prépare un objet "filter" vide. S'il reste vide, on récupérera tout.
            const filter = {};

            // Étape 4.1 — Filtrer par type (?type=Fire)
            if (req.query.type) {
                filter.type = req.query.type;
            }

            // Étape 4.2 — Rechercher par nom (?name=pika)
            if (req.query.name) {
                // $regex permet de chercher un bout de texte, $options: 'i' rend insensible à la casse
                filter["name.english"] = { $regex: req.query.name, $options: 'i' };
            }

            // Étape 4.4 (Préparation) — Pagination (?page=1&limit=20)
            // On récupère les valeurs de l'URL, ou on met des valeurs par défaut (page 1, limite 50)
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 50;
            // On calcule combien de résultats ignorer (skip)
            const skip = (page - 1) * limit;

            // Étape 4.3 (Préparation) — Trier les résultats (?sort=-base.HP)
            // Mongoose accepte directement la chaîne de caractères envoyée dans l'URL
            const sortOption = req.query.sort || {};

            // --- EXÉCUTION DE LA REQUÊTE ---
            
            // 1. On compte le nombre TOTAL de Pokémon qui correspondent aux filtres (pour la métadonnée)
            const total = await Pokemon.countDocuments(filter);

            // 2. On récupère les vraies données en combinant tout (Étape 4.5)
            const pokemonsList = await Pokemon.find(filter)
                .sort(sortOption)  // Étape 4.3 : On trie
                .skip(skip)        // Étape 4.4 : On passe les résultats des pages précédentes
                .limit(limit);     // Étape 4.4 : On limite le nombre de résultats

            // 3. On calcule le nombre total de pages
            const totalPages = Math.ceil(total / limit);

            // Format de réponse demandé dans le TP (🎯 Format de réponse avec pagination)
            res.status(200).json({
                data: pokemonsList,
                page: page,
                limit: limit,
                total: total,
                totalPages: totalPages
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // =========================================================
    // LES AUTRES FONCTIONS (Inchangées)
    // =========================================================
    getPokemonById: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const pokemon = await Pokemon.findOne({ id: id });

            if (!pokemon) {
                return res.status(404).json({ error: "Pokemon not found" });
            }
            res.status(200).json(pokemon);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createPokemon: async (req, res) => {
        try {
            const newPokemon = await Pokemon.create(req.body);
            res.status(201).json(newPokemon);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updatePokemon: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const updatedPokemon = await Pokemon.findOneAndUpdate(
                { id: id }, 
                req.body, 
                { new: true }
            );

            if (!updatedPokemon) {
                return res.status(404).json({ error: "Pokemon not found" });
            }
            res.status(200).json(updatedPokemon);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deletePokemon: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const deletedPokemon = await Pokemon.findOneAndDelete({ id: id });

            if (!deletedPokemon) {
                return res.status(404).json({ error: "Pokemon not found" });
            }
            res.status(204).send(); 
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default PokemonsController;