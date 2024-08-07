
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
  
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true, // Convertit l'e-mail en minuscules avant de le stocker
        trim: true, // Supprime les espaces au début et à la fin
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] // Validation du format de l'e-mai
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String,
        required: true,
        enum: ['user' , 'admin']
    }
    
   
});


// Ajout de la validation d'unicité
userSchema.plugin(uniqueValidator, { message: '{PATH} already exists.' });

// Méthode pour comparer les mots de passe que j'ai dans ma BD avec bcrypt
userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};


// Hachage du mot de passe avant de le sauvegarder
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next(); // (Si le mot de passe n'est pas modifié, il passe suivant)
    }


    // Générer un salt (token) pour lui
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Passe au prochain middleware ou à la sauvegarde
});

const User = mongoose.model('User', userSchema);
export default User;


//npm install mongoose-unique-validator
