const {getKeysNotProvided, isObjectIdStringValid} = require("../utils.js");
const {User} = require("../models/UserModel.js");

/**
 * Créer un utilisateur
 * @param user L'utilisateur à créer
 * @returns L'utilisateur crée
 */
async function createUser(user) {
    const neededKeys = ["name", "email", "password", "password_confirmation"];
    const keysNotGiven = getKeysNotProvided(neededKeys, user);

    if (keysNotGiven.length !== 0) {
        return `Erreur, champs manquants: '${keysNotGiven.join(', ')}'`;
    }

    if(user.password !== user.password_confirmation){
        return "Erreur: les deux mots de passe saisis sont différents"
    }

    try {
        const userToCreate = new User(user);
        return await userToCreate.save();
    }

    catch (e) {
        return e.message;
    }

}

async function deleteUser(userId) {
    if (userId === undefined || !isObjectIdStringValid(userId)) {
        return "L'id de l'utilisateur n'existe pas ou n'est pas un id MongoDB"
    }
    // On essaye de trouver l'utilisateur
    try {

        // On veut chercher un object dans la collection "User" par son identifiant MongoDB
        const userDeleted = await User.findByIdAndDelete(userId);

        // Si l'utilisateur trouvé est null c'est qu'il n'existe pas dans la base de données
        if (userDeleted === null) {
            return "L'utilisateur n'existe pas et n'a donc pas pû être supprimé"
        }

        // Sinon c'est qu'il existe et on le renvoie
        return userDeleted;
    }

        // S'il y a une erreur, on envoie un message à l'utilisateur
    catch (e) {
        return "Erreur lors de la recherche de l'utilisateur";
    }
}

/**
 * Récupère TOUS les utilisateurs depuis la base de données
 */
async function readAllUsers() {
    
    // On essaye de récupérer TOUS les utilisateurs (donc on ne met pas de conditions lors de la recherche, juste un object vide)
    try {
        return await User.find({})
    }

    // S'il y a une erreur, on renvoie un message
    catch (e) {
        return "Il y a eu une erreur lors de la recuperation des utilisateurs";
    }
}

// On exporte les modules
module.exports = {
    createUser: createUser,
    deleteUser: deleteUser,
    readAllUsers: readAllUsers
}