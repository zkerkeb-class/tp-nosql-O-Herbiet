// routes/auth.js
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../schema/user.js';

const router = Router();

// --- INSCRIPTION (REGISTER) ---
router.post('/register', async (req, res) => {
    try {
        // On crée l'utilisateur (le mot de passe sera hashé automatiquement par le pre-save)
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        res.status(201).json({ message: "Utilisateur créé avec succès !", user: newUser.username });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// --- CONNEXION (LOGIN) ---
router.post('/login', async (req, res) => {
    try {
        // 1. On cherche l'utilisateur par son pseudo
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ error: "Utilisateur ou mot de passe incorrect" });
        }

        // 2. On compare le mot de passe tapé avec celui crypté en base
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Utilisateur ou mot de passe incorrect" });
        }

        // 3. Si tout est bon, on génère le Token VIP
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        // On renvoie le token à l'utilisateur
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;