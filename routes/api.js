const express = require("express");
const {printSession} = require("../middlewares/index.js");
const {getUserData, logInUser, signUpUser, readAllAccounts, updateAccount, deleteAccount} = require("../controllers/accounts");
const {createTicket, readAllTickets, readMyTickets, updateTicket, deleteTicket, getTicketData} = require("../controllers/tickets");
const {isUserAuthenticated, checkUserNotAlreadyAuthenticated, isSuperUser, isUserAsking} = require("../middlewares");

// On crée le router de l'api
const apiRouter = express.Router();

/**
 * Route ping où on ajoute le middleware qui va nous montrer ce qu'il y a dans la session
 */
apiRouter.get('/ping', printSession, function (req, res) {
    res.json({
        status: "OK",
        timestamp: (new Date()).getTime()
    });
});

/**
 * Récupère un utilisateur par rapport à son id
 * @middleware isUserAuthenticated: Seul un utilisateur connecté peut accéder à cet endpoint
 */
apiRouter.get('/user/:userId', isUserAuthenticated, async (req, res) => {

    // On fait un try catch pour intercepter une potentielle erreur
    try {
        res.json(await getUserData(req.params.userId));
    } catch (e) {
        res.status(500).send(e.message);
    }
});

/**
 * Modifie un utilisateur par rapport à son id et le contenu de la requête
 * @middleware isUserAuthenticated: Seul un utilisateur connecté peut accéder à cet endpoint
 * @middleware isUserAsking: Seul l'utilisateur connecté OU un super utilisateur a le droit d'accéder à cet endpoint
 */
apiRouter.put('/user/:userId', isUserAuthenticated, isUserAsking, async (req, res) => {

    // On fait un try catch pour intercepter une potentielle erreur
    try {
        res.json(await updateAccount(req.params.userId, req.body));
    } catch (e) {
        res.status(500).send(e.message);
    }
});

/**
 * Supprime un utilisateur par rapport à son id
 * @middleware isUserAuthenticated: Seul un utilisateur connecté peut accéder à cet endpoint
 * @middleware isUserAsking: Seul l'utilisateur connecté OU un super utilisateur a le droit d'accéder à cet endpoint
 */
apiRouter.delete('/user/:userId', isUserAuthenticated, isUserAsking, async (req, res) => {

    // On fait un try catch pour intercepter une potentielle erreur
    try {
        res.json(await deleteAccount(req.params.userId));
    } catch (e) {
        res.status(500).send(e.message);
    }
});

/**
 * Récupère tous les utilisateurs
 * @middleware isUserAuthenticated: Seul un utilisateur connecté peut accéder à cet endpoint
 * @middleware isSuperUser: seul un superuser peut accéder à cet endpoint
 */
apiRouter.get('/accounts', isUserAuthenticated, isSuperUser, async (req, res) => {

    // On fait un try catch pour intercepter une potentielle erreur
    try {
        res.json(await readAllAccounts());
    } catch (e) {
        res.status(500).send(e.message);
    }
});

/**
 * La route pour que l'utilisateur se connecte
 */
apiRouter.get('/login', checkUserNotAlreadyAuthenticated, async (req, res) => {

    try {
        // On récupère le login et le mot de passe du header
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';

        // On essaye de connecter l'utilisateur
        const result = await logInUser(b64auth);

        // On veut stocker des informations dans la session
        req.session.userId = result.accountId;
        req.session.email = result.email;
        req.session.isSuperUser = result.isSuperUser;

        // On renvoie le résultat
        res.json(result);
    }

        // Si on attrape une erreur, on renvoie un code HTTP disant que l'utilisateur n'a pas pu se connecter (Unauthorized)
    catch (e) {
        res.status(401).send(e.message);
    }
});

/**
 * on déconnecte l'utilisateur
 * @middleware isUserAuthenticated: Seul un utilisateur connecté peut accéder à cet endpoint
 */
apiRouter.delete('/logout', isUserAuthenticated, async (req, res) => {

    // On détruit la session
    try {
        await req.session.destroy();
    } catch (e) {
    }

    // On enlève le cookie (même si ça doit se faire tout seul, on sait jamais...)
    res.clearCookie("connect.sid");

    res.end("La session a été détruite");
});

/**
 * On récupère la donnée de l'utilisateur actuel
 * @middleware isUserAuthenticated: Seul un utilisateur connecté peut accéder à cet endpoint
 */
apiRouter.get('/userdata', isUserAuthenticated, async (req, res) => {

    // On essaye de faire la requête et s'il y a une erreur, on la renvoie avec un code d'erreur
    try {
        res.json(await getUserData(req.session.userId));
    } catch (e) {

        // On renvoie l'erreur avec un code 500 (Internal Server Error)
        res.status(500).send(e.message)
    }
});

/**
 * On regarde si l'utilisateur est connecté
 * @middleware isUserAuthenticated: Seul un utilisateur connecté peut accéder à cet endpoint
 */
apiRouter.get('/authenticated', isUserAuthenticated, async (req, res) => {

    // Comme le router fait foi que l'utilisateur est connecté on sait que si l'on retourne quelque chose alors c'est parce qu'il est connecté
    res.json({
        isUserLogged: true,
        isSuperUser: req.session.isSuperUser === true
    })
});

/**
 * Permet de créer un compte utilisateur
 */
apiRouter.post('/signup', async (req, res) => {

    // On fait un try catch pour intercepter une potentielle erreur
    try {
        res.json(await signUpUser(req.body.username, req.body.email, req.body.password, req.body.isSuperUser));
    } catch (e) {
        res.status(500).send(e.message);
    }
});

/**
 * Permet de créer un ticket
 */
apiRouter.post('/newticket', isUserAuthenticated, async (req, res) => {

    // On fait un try catch pour intercepter une potentielle erreur
    try {
        res.json(await createTicket(req.body.title, req.body.ticket_type, req.body.priority, req.body.description, req.session.userId));
    } catch (e) {
        res.status(500).send(e.message);
    }
});

apiRouter.get('/tickets', isUserAuthenticated, isSuperUser, async (req, res) => {

    // On fait un try catch pour intercepter une potentielle erreur
    try {
        res.json(await readAllTickets());
    } catch (e) {
        res.status(500).send(e.message);
    }
});

apiRouter.get('/mytickets', isUserAuthenticated, async (req, res) => {

    // On fait un try catch pour intercepter une potentielle erreur
    try {
        res.json(await readMyTickets(req.session.userId));
    } catch (e) {
        res.status(500).send(e.message);
    }
});

apiRouter.get('/ticket/:ticketId', isUserAuthenticated, async (req, res) => {

    // On fait un try catch pour intercepter une potentielle erreur
    try {
        res.json(await getTicketData(req.params.ticketId));
    } catch (e) {
        res.status(500).send(e.message);
    }
});

apiRouter.put('/ticket/:ticketId', isUserAuthenticated, async (req, res) => {

    try {
        res.json(await updateTicket(req.params.ticketId, req.body));
    } catch (e) {
        res.status(500).send(e.message);
    }
});

apiRouter.delete('/ticket/:ticketId', isUserAuthenticated, async (req, res) => {

    try {
        res.json(await deleteTicket(req.params.ticketId));
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// On exporte seulement le router
module.exports = apiRouter;