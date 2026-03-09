import mongoose from "mongoose";

// La liste stricte des types autorisés
const typesAutorises = [
    "Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", 
    "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", 
    "Dragon", "Dark", "Steel", "Fairy"
];

const pokemonSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, "L'ID est obligatoire."],
        unique: true,
        min: [1, "L'ID doit être un entier positif (minimum 1)."],
        validate: {
            validator: Number.isInteger,
            message: "L'ID doit être un nombre entier."
        }
    },
    name: {
        english: { type: String },
        japanese: { type: String },
        chinese: { type: String },
        french: { type: String, required: [true, "Le nom français est obligatoire."] },
    },
    type: {
        // On vérifie chaque type dans le tableau
        type: [{
            type: String,
            enum: {
                values: typesAutorises,
                message: "Le type '{VALUE}' n'est pas valide ! Choisissez un vrai type en anglais (ex: Fire, Water...)."
            }
        }],
        required: [true, "Un Pokémon doit avoir au moins un type."],
    },
    base: {
        HP: { type: Number, required: true, min: [1, "Les HP doivent être d'au moins 1."], max: [255, "Les HP ne peuvent pas dépasser 255."] },
        Attack: { type: Number, required: true, min: [1, "L'Attaque doit être d'au moins 1."], max: [255, "L'Attaque ne peut pas dépasser 255."] },
        Defense: { type: Number, required: true, min: [1, "La Défense doit être d'au moins 1."], max: [255, "La Défense ne peut pas dépasser 255."] },
        SpecialAttack: { type: Number, required: true, min: [1, "L'Attaque Spéciale doit être d'au moins 1."], max: [255, "L'Attaque Spéciale ne peut pas dépasser 255."] },
        SpecialDefense: { type: Number, required: true, min: [1, "La Défense Spéciale doit être d'au moins 1."], max: [255, "La Défense Spéciale ne peut pas dépasser 255."] },
        Speed: { type: Number, required: true, min: [1, "La Vitesse doit être d'au moins 1."], max: [255, "La Vitesse ne peut pas dépasser 255."] },
    },
    image: {
        type: String,
        required: [true, "L'image est obligatoire."],
    },
});

// ✅ CORRECTION ICI : On crée la constante "Pokemon", en forçant la collection "Pokemons" (avec majuscule)
const Pokemon = mongoose.model("pokemon", pokemonSchema, 'Pokemons');

// Et on fait un seul export propre !
export default Pokemon;