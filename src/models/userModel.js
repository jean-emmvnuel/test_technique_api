const supabase = require("../config/supabase");

async function createUser({ nom, email, téléphone }) {
    try {
        const { data, error } = await supabase
            .from("users")
            .insert({ nom, email, téléphone })
            .select()
            .single();

        return { data, error };
    } catch (error) {
        return { data: null, error };
    }
}

async function getUserByEmail(email) {
    try {
        const { data, error } = await supabase
            .from("users")
            .select()
            .eq("email", email)
            .single();

        return { data, error };
    } catch (error) {
        return { data: null, error };
    }
}

module.exports = { 
    createUser ,
    getUserByEmail
};
