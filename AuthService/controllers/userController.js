

import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

// Authentification de l'utilisateur et génération de token
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Enregistrement de l'utilisateur
const registerUser = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    try {
        console.log(`Attempting to register user with email: ${email}`);

        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log(`User with email ${email} already exists.`);
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = await User.create({
            email,
            password,
            role,
        });

        if (user) {
            console.log(`User with email ${email} created successfully.`);
            res.status(201).json({
                _id: user._id,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            console.log(`Invalid user data for email ${email}.`);
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Route pour obtenir les informations de l'utilisateur depuis le token
const getUserInfoFromToken = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findById(decoded.id);

        if (user) {
            res.json({ id: user._id, role: user.role });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error: error.message });
    }
});

export { authUser, registerUser, getUserInfoFromToken };
