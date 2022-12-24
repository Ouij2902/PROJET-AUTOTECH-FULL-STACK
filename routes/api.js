const express = require("express");
const {createUser, logInUser, deleteUser, readAllUsers} = require("../controllers/users.js");

// On crée le router de l'api
const apiRouter = express.Router();

/**
 * Créer un utilisateur
 */
apiRouter.post('/new_user', async (req, res) => {

    // On crée l'utilisateur
    const utilisateurCree = await createUser(req.body);

    // On renvoie l'utilisateur créé !
    res.json(utilisateurCree);
});

/**
 * Supprime un utilisateur par rapport à son id
 */
apiRouter.delete('/user/:userId', async (req, res) => {
    res.json(await deleteUser(req.params.userId));
});

/**
 * Récupère tous les utilisateurs
 */
apiRouter.get('/all_users', async (req, res) => {
    res.json(await readAllUsers());
});

// On exporte seulement le router
module.exports = apiRouter;