// schema/user.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Le "pre-save" : Avant de sauvegarder dans la base de données...
userSchema.pre('save', async function () {
    // Si le mot de passe a été modifié ou vient d'être créé...
    if (this.isModified('password')) {
        // ...on remplace le mot de passe en clair par sa version cryptée (hashée)
        this.password = await bcrypt.hash(this.password, 10);
    }
});

// On exporte le modèle, qui créera la collection "Users"
export default mongoose.model('User', userSchema, 'Users');