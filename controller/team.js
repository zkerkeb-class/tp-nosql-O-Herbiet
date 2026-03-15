import User from '../schema/user.js'; // On importe le modèle utilisateur

export const addToTeam = async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.id); // L'ID du Pokémon dans l'URL
        
        // 👇 LA CORRECTION EST ICI : On utilise exactement ta formule magique !
        const userId = req.user.userId || req.user.id; 

        // 1. On cherche l'utilisateur dans la base de données
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable." });
        }

        // 2. LE VIGILE DE L'ÉQUIPE : On vérifie s'il y a déjà 6 Pokémon
        if (user.team.length >= 6) {
            return res.status(400).json({ 
                message: "Ton équipe est déjà complète ! Impossible d'avoir plus de 6 Pokémon." 
            });
        }

        // 3. Si tout va bien, on ajoute le Pokémon à l'équipe
        user.team.push(pokemonId);
        await user.save(); // On sauvegarde la modification dans la base de données

        // 4. On répond que tout s'est bien passé
        res.status(200).json({
            message: "Pokémon ajouté à ton équipe avec succès ! 🎉",
            team: user.team // On renvoie la nouvelle équipe pour vérifier
        });

    } catch (error) {
        console.error("Erreur d'équipe :", error);
        res.status(500).json({ error: "Impossible de modifier l'équipe." });
    }
};