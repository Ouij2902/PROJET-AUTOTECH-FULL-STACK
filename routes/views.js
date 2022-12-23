const express = require("express");

// On crée le router de l'api
const viewsRouter = express.Router();

viewsRouter.get('/', function (req, res) {
    res.render('index.ejs');
});

viewsRouter.get('/home', function (req, res) {
    res.render('index.ejs');
});

viewsRouter.get('/register', function (req, res) {
    res.render('register.ejs');
});

viewsRouter.get('/aboutus', function (req, res) {
    res.render('aboutus.ejs');
});

viewsRouter.get('/contact', function (req, res) {
    res.render('contact.ejs');
});

viewsRouter.get('/profile', function (req, res) {
    res.render('profile.ejs');
});

// On exporte seulement le router
module.exports = viewsRouter;