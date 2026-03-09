import Pokemon from '../schema/pokemon.js'; // On importe ton modèle

export const getStats = async (req, res) => {
    try {
        // 1. Calcul du nombre de Pokémon et de la moyenne des HP par type
        const statsByType = await Pokemon.aggregate([
            // Comme un Pokémon peut avoir 2 types (ex: ["Plante", "Poison"]), 
            // $unwind le dédouble sur le tapis roulant pour compter chaque type séparément.
            { $unwind: "$type" }, 
            
            // $group rassemble tous ceux du même type et fait les calculs
            { $group: {
                _id: "$type", // On regroupe par type
                nombreDePokemons: { $sum: 1 }, // On ajoute 1 à chaque fois qu'on en trouve un
                moyenneHP: { $avg: "$base.HP" } // On calcule la moyenne du champ base.HP
            }},
            
            // $sort trie les résultats du plus grand nombre au plus petit (-1)
            { $sort: { nombreDePokemons: -1 } } 
        ]);

        // 2. Recherche du Pokémon avec le plus d'attaque
        const maxAttackPokemon = await Pokemon.aggregate([
            { $sort: { "base.Attack": -1 } }, // On trie par attaque décroissante
            { $limit: 1 } // On ne garde que le premier de la liste !
        ]);

        // 3. Recherche du Pokémon avec le plus de HP (Points de vie)
        const maxHpPokemon = await Pokemon.aggregate([
            { $sort: { "base.HP": -1 } }, // On trie par HP décroissant
            { $limit: 1 } 
        ]);

        // 4. On emballe tout ça et on l'envoie à l'utilisateur !
        res.status(200).json({
            message: "Voici les statistiques de ton Pokédex !",
            statsParType: statsByType,
            meilleurAttaquant: maxAttackPokemon[0], // On met [0] pour sortir le Pokémon de son tableau
            meilleurTank: maxHpPokemon[0]
        });

    } catch (error) {
        console.error("Erreur de stats :", error);
        res.status(500).json({ error: "Impossible de calculer les statistiques." });
    }
};