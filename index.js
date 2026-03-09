// index.js
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import favoritesRoutes from './routes/favorites.js';
import statsRoutes from './routes/stats.js';

// Importation de tes routes
import pokemonsRoutes from './routes/pokemons.js';
import authRoutes from './routes/auth.js';

const app = express();

// Le port dynamique pour le Cloud (Render), ou 3000 sur ton PC
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES GLOBAUX ---
app.use(cors()); // Permet les requêtes cross-origin
app.use(express.json()); // Permet de lire le JSON dans le body

// 🌟 CONSERVÉ DE TON CODE : Permet d'accéder aux fichiers dans le dossier "assets"
app.use('/assets', express.static('assets')); 

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/pokemons', pokemonsRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/stats', statsRoutes);

// --- CONNEXION BASE DE DONNÉES & DÉMARRAGE ---
// (Remplace ton ancien fichier connect.js pour s'assurer que l'API 
// démarre UNIQUEMENT si la base de données est bien connectée)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ Connecté à MongoDB Cloud !");
        
        // On lance le serveur seulement si la BDD est connectée
        app.listen(PORT, () => {
            console.log(`🚀 Serveur en ligne sur le port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Erreur de connexion MongoDB :", error);
    });