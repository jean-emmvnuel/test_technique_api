const supabase = require("../config/supabase");


// model pour obtenir toutes les transactions
async function getTransactions() {
    try {
        const { data, error } = await supabase.from("transactions").select();
        return { data, error };
    } catch (error) {
        return { data: null, error };
    }
}

// model pour créer une transaction
async function createTransaction({ montant, statut, date}) {
    try {
        const { data, error } = await supabase
        .from("transactions")
        .insert({ montant, statut, date })
        .select();
        return { data, error };
    } catch (error) {
        return { data: null, error };
    }
}


module.exports = {
    getTransactions,
    createTransaction
}