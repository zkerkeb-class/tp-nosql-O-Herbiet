import User from '../schema/user.js';

// GET /api/favorites — Lister mes Pokémon favoris
export const getFavorites = async (req, res) => {
    try {
        // Selon comment tu as créé ton token lors du login, l'ID est dans userId ou id
        const userId = req.user.userId || req.user.id; 
        
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "Utilisateur introuvable." });

        res.status(200).json({ favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des favoris." });
    }
};

// POST /api/favorites/:pokemonId — Ajouter un favori
export const addFavorite = async (req, res) => {
    try {
        const userId = req.user.userId || req.user.id;
        const pokemonId = parseInt(req.params.pokemonId); // On récupère l'ID dans l'URL

        // $addToSet ajoute l'ID seulement s'il n'y est pas déjà
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { favorites: pokemonId } },
            { new: true } // Demande à Mongoose de renvoyer l'utilisateur mis à jour
        );

        res.status(200).json({ message: "Ajouté aux favoris !", favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout." });
    }
};

// DELETE /api/favorites/:pokemonId — Retirer un favori
export const removeFavorite = async (req, res) => {
    try {
        const userId = req.user.userId || req.user.id;
        const pokemonId = parseInt(req.params.pokemonId);

        // $pull retire l'ID du tableau
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { favorites: pokemonId } },
            { new: true }
        );

        res.status(200).json({ message: "Retiré des favoris !", favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression." });
    }
};