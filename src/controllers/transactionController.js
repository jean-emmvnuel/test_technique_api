const transactionModel = require("../models/transactionModel");

async function createTransaction(req, res) {
    try {
        let { montant, statut, date } = req.body;
        // Validation
        montant = parseFloat(montant);
        
        if (!montant || !statut || !date) {
            return res.status(400).json({ 
                success : false,
                message: 'Tous les champs sont obligatoires' 
            });
        }
        
        if (isNaN(montant) || montant <= 0) {
            return res.status(400).json({ message: 'Le montant doit être un nombre positif' });
        }
        if (statut !== "EN COURS" && statut !== "ECHOUEE" && statut !== "SUCCES") {
            return res.status(400).json({ 
                success : false,
                message: 'Le statut doit soit succes ou echouee ou en cours' 
            });
        }
        const { data, error } = await transactionModel.createTransaction({ montant, statut, date });
        if(error) return res.status(400).json({ 
            success : false,
            message : error.message || "Une erreur s'est produite lors de la création de la transaction" 
        });
        res.json({
            succes: true,
            message : "Transaction crée avec success",
            data : data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            success : false,
            message :error.message || "Une erreur interne au serveur s'est produite" 
        });
    }
}



async function getTransactions(req, res) {
    try {
        const { data, error } = await transactionModel.getTransactions();
        if(error) return res.status(400).json({ message : "Une erreur s'est produite lors de la recuperation des transactions" });
        res.json({
            success: true,
            message : "Liste des transactions",
            data : data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            success : false,
            message : "Une erreur interne au serveur s'est produite" 
        });
    }
}



module.exports = {
    createTransaction,
    getTransactions
}