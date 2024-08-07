

import express from 'express';
import { authUser, registerUser , getUserInfoFromToken } from '../controllers/userController.js';

const router = express.Router();

// Route pour l'enregistrement
router.post('/register', registerUser);

// Route pour la connexion
router.post('/login', authUser);

//  Route pour obtenir les infos de l USER depuis le token
router.get('/user-info', getUserInfoFromToken);



export default router;

