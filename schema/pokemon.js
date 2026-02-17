import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        english: { type: String },
        japanese: { type: String },
        chinese: { type: String },
        french: { type: String, required: true },
    },
    type: {
        type: [String],
        required: true,
    },
    base: {
        HP: { type: Number, required: true },
        Attack: { type: Number, required: true },
        Defense: { type: Number, required: true },
        SpecialAttack: { type: Number, required: true },
        SpecialDefense: { type: Number, required: true },
        Speed: { type: Number, required: true },
    },
    image: {
        type: String,
        required: true,
    },
});

// ✅ CORRECTION ICI : On crée la constante "Pokemon", en forçant la collection "Pokemons" (avec majuscule)
const Pokemon = mongoose.model("pokemon", pokemonSchema, 'Pokemons');

// Et on fait un seul export propre !
export default Pokemon;