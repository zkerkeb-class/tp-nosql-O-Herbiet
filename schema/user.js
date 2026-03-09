import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Le tableau pour les favoris
    favorites: { type: [Number], default: [] },
    // 👇 Le tableau pour l'équipe (avec sa virgule et son accolade bien fermée !)
    team: { type: [Number], default: [] }
});

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

export default mongoose.model('User', userSchema, 'Users');