
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoute.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Vérif si la variable d'environnement est définie
console.log('MONGODB_URL:', process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL, {ssl: process.env.MONGO_SSL})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB', error));

app.use('/', authRoutes); // UTILISATION Des Routes d'auth

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Service d'authentification en cours d'exécution sur le port ${PORT}`);
});



// cd ../AuthService
// npm init -y
// npm install express mongoose bcrypt jsonwebtoken body-parser
