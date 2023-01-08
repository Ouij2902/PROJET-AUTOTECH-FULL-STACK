const crypto = require("crypto");
const {Account} = require("../models/AccountModel");
const {isObjectIdStringValid} = require("../utils");

/**
 * Mettre à jour un utilisateur
 * @param userId L'id de l'utilisateur à mettre à jour
 * @param userToUpdate Les éléments de l'utilisateur à mettre à jour
 * @returns L'utilisateur modifié
 */
async function updateAccount(accountId, userToUpdate) {

    // Vérifier si l'userId existe et est un id MongoBD valide
    if (accountId === undefined || !isObjectIdStringValid(accountId)) {
        throw new Error("L'id de l'utilisateur n'existe pas ou n'est pas un id MongoDB");
    }
    // on vérifie que les champs à modifier ne sont pas vides
    if (userToUpdate.username === "") {
        delete userToUpdate.username;
    }
    if (userToUpdate.email === "") {
        delete userToUpdate.email;
    }

    // On demande à MongoDB de modifier les couples clefs/valeurs présents dans l'object userToUpdate de l'object qui a pour identifiant unique MongoDB 'userId'
    // Noter l'option {new: true} qui veut dire que MongoDB nous renverra l'object modifié et non l'object avant sa modification (car on veut renvoyer le user modifié à l'utilisateur)
    const userUpdated = await Account.findByIdAndUpdate(accountId, userToUpdate, {new: true});

    // Si l'utilisateur trouvé est null c'est qu'il n'existe pas dans la base de données
    if (userUpdated === null) {
        throw new Error("L'utilisateur n'existe pas et n'a donc pas pû être modifié");
    }

    // Sinon c'est qu'il existe et on le renvoie
    return userUpdated;
}

async function deleteAccount(accountId) {

    // Vérifier si l'userId existe et est un id MongoBD valide
    if (accountId === undefined || !isObjectIdStringValid(accountId)) {
        throw new Error("L'id de l'utilisateur n'existe pas ou n'est pas un id MongoDB")
    }

    // On demande à MongoDB de supprimer l'utilisateur qui a comme identifiant unique MongoDB 'userId'
    const userDeleted = await Account.findByIdAndDelete(accountId);

    // Si l'utilisateur trouvé est null c'est qu'il n'existe pas dans la base de données
    if (userDeleted === null) {
        throw new Error("L'utilisateur n'existe pas et n'a donc pas pû être supprimé");
    }

    // Sinon c'est qu'il existe et on le renvoie
    return userDeleted;
}

/**
 * On essaye de connecter l'utilisateur
 * @param headerAuthorization Le header authorization
 */
const logInUser = async (headerAuthorization) => {

    // On récupère le mot de passe et l'username du header authorization
    let [email, password] = Buffer.from(headerAuthorization, 'base64').toString().split(':');

    // On hash le mot de passe avec l'algorithme SHA256 et on veut le résultat en hexadecimal
    let passwordToCheck = crypto.createHash('sha256').update(password).digest("hex");

    // On cherche le compte qui a cet username avec le mot de passe.
    let accountFound = await Account.findOne({email: email.toLowerCase(), password: passwordToCheck});

    // Si le compte existe alors on renvoie ses données
    if (accountFound !== null) {
        return {
            accountId: accountFound._id,
            email: accountFound.email,
            isSuperUser: accountFound.isSuperUser
        }
        
    }

    // Sinon on veut renvoyer une erreur
    throw new Error("Aucun compte n'a été trouvé avec ces identifiants");
}

/**
 * Récupère la donnée de l'utilisateur (son compte + l'utilisateur en lui-même) (sauf le mot de passe)
 * @param accountId L'id de l'utilisateur que l'on veut récupérer
 */
const getUserData = async (accountId) => {

    // Vérifier si l'userId existe et est valide
    if (accountId === undefined || !isObjectIdStringValid(accountId)) {
        throw new Error("L'id de l'utilisateur est invalide ou non défini");
    }

    // On Veut trouver le compte lié à l'utilisateur et le retourner avec les données de l'utilisateur (sans le mot de passe)
    // Le fait d'utiliser lean nous permet de renvoyer l'object JSON et non l'object avec le Model associé (https://mongoosejs.com/docs/tutorials/lean.html)
    let userFound = await Account.findById(accountId).lean();

    // Si l'utilisateur n'a pas été trouvé on renvoie une erreur
    if (userFound === null) {
        throw new Error("L'utilisateur n'a pas été trouvé");
    }

    // Sinon on enlève le mot de passe
    delete userFound.password;

    // On renvoie la donnée
    return userFound;
}


/**
 * Créer un nouveau compte utilisateur (avec un utilisateur associé)
 * @param email L'email avec lequel le compte doit être créé
 * @param password Le mot de passe du compte
 * @param isSuperUser Si l'utilisateur est un "super utilisateur" (un admin)
 * @param user Les informations utilisateur pour créer l'utilisateur lié au compte
 */
const signUpUser = async (username, email, password, isSuperUser) => {

    // On fait des tests...
    if (username === undefined || username === "") {
        throw new Error("Un nom d'utilisateur doit être défini et non vide pour créer un compte");
    }
    if (email === undefined || email === "") {
        throw new Error("L'email doit être défini et non vide pour créer un compte");
    }
    if (password === undefined || password === "") {
        throw new Error("Le mot de passe doit être défini et non vide pour créer un compte");
    }
    if (isSuperUser === undefined) {
        isSuperUser = false;
    }

    // On regarde déjà si un compte n'existe pas à cette adresse email (pour ne pas en recréer un)
    const alreadyExistingEmail = await Account.findOne({email: email});
    if (alreadyExistingEmail !== null) {
        throw new Error("Un compte existe déjà avec cette adresse email");
    }

    const alreadyExistingUsername = await Account.findOne({username: username});
    if (alreadyExistingUsername !== null) {
        throw new Error("Un compte existe déjà avec ce nom d'utilisateur");
    }

    // On utilise le sha256 pour sécuriser le mot de passe dans la base de données
    const passwordEncrypted = crypto.createHash('sha256').update(password).digest("hex");

    // Une fois l'utilisateur crée on va créer le compte où l'utilisateur sera associé
    const newAccount = new Account({
        username: username,
        email: email.toLowerCase(),
        password: passwordEncrypted,
        isSuperUser: isSuperUser
    });

    // On essaye de créer le compte, on veut faire un try/catch, car si ça ne marche pas on veut supprimer l'utilisateur associé, car il ne pourra pas être lié à un compte
    try {
        const accountCreated = await newAccount.save();

        // On veut retourner l'id du compte créé
        return accountCreated._id;
    } catch (e) {

        // On veut supprimer l'utilisateur
        //await deleteAccount(userCreated._id);

        // Et on throw l'erreur qu'on a catch
        throw e;
    }
}

/**
 * Récupère TOUS les comptes utilisateurs depuis la base de données
 */
async function readAllAccounts() {

    try {
        var accountsFound = await Account.find({}).lean();
        accountsFound.forEach(function (acc) {
            delete acc.password;
        });
    }
    catch (e) {
        throw new Error("Il y a eu une erreur lors de la recuperation des comptes utilisateurs");
    }
    return accountsFound;
}

// On exporte les fonctions
module.exports = {
    logInUser: logInUser,
    getUserData: getUserData,
    signUpUser: signUpUser,
    readAllAccounts : readAllAccounts,
    updateAccount: updateAccount,
    deleteAccount: deleteAccount
}