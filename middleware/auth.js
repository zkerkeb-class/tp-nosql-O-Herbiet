// middleware/auth.js
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        // 1. On cherche l'en-tête "Authorization" dans la requête
        const authHeader = req.headers.authorization;

        // Si l'en-tête est absent ou ne commence pas par "Bearer "...
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Accès refusé. Token manquant ou mal formaté." });
        }

        // 2. On extrait le token (qui ressemble à "Bearer eyJhbGci...")
        // .split(' ')[1] permet de couper la phrase en deux autour de l'espace et de garder la 2ème partie
        const token = authHeader.split(' ')[1];

        // 3. On vérifie si le token est valide et n'a pas été falsifié
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Si c'est bon, on stocke les infos de l'utilisateur dans req.user
        req.user = decoded;

        // 5. On dit au serveur : "C'est bon, laisse-le passer à l'étape suivante !"
        next();
    } catch (error) {
        // Si le token est expiré ou faux, verify() plante et on atterrit ici
        res.status(401).json({ error: "Token invalide ou expiré." });
    }
};

export default auth;