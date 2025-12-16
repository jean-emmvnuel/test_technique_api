const userModel = require("../models/userModel");

// Création utilisateur
async function createUser(req, res) {
    try {
        let { nom, email, téléphone } = req.body;

        // Normalisation
        nom = nom.trim();
        email = email.toLowerCase().trim();

        // Validation
        if (!nom || !email || !téléphone) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        }

        if (!/^\d{10}$/.test(téléphone)) {
            return res.status(400).json({ message: 'Le numéro de téléphone doit contenir 10 chiffres' });
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            return res.status(400).json({ message: 'Le format de l\'email est incorrect' });
        }

        //verifier si l'utilisateur existe
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Un utilisateur avec cette adresse email existe deja' });
        }

        // Création utilisateur
        const { data, error } = await userModel.createUser({ nom, email, téléphone });

        if (error) {
            return res.status(400).json({ message: error.message || 'Erreur lors de la création' });
        }

        res.status(201).json({
            success: true,
            message: 'Utilisateur créé avec succès',
            data: data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la création de l\'utilisateur'
        });
    }
}

module.exports = { 
    createUser 
};
