const express = require('express');
// const SesionStog = require('sessionstorage');
const router = express.Router();

const passport = require('passport');

const db = require('../database');

const { isLoggedIn, isNotLoggedIn } = require('../lib/authenfction');

//Cette route permet d afficher le formulaire de creaction de compte
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('authen/signup');
});


//Route pour crer son compte et se connecter
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect:  '/signin',
    failureRedirect: '/signup',
    failureFlash: true
}));



//Cette route permet d afficher le formulaire de creaction de compte
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('authen/signin');
});


//Cette route permet de faire le Login
// successRedirect: (SesionStog.getItem('statut') == 1) ? '/profil' : '/signin',
router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profil',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});


//Route pour le Profil apres creaction de compte
// router.get('/profil', isLoggedIn, (req, res) => {
//     res.render('profil');
// });

router.get('/profil', isLoggedIn, async(req, res) => {
    // const {id} = req.params;
    // console.log(id);
    const prod = await db.query('SELECT * FROM panier WHERE users_id = ?', [req.user.id]);
    // req.flash('success', 'Commande enregistrer effectué avec succes veullez verifier votre Profil');
//    console.log(prod);
    res.render('profil', {prod});
});


//Pour supprimer un element ds la BD
router.get('/profil/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
        // console.log(id);
    await db.query('DELETE FROM panier WHERE id_pan = ?', [id]);
    req.flash('success', "Le Produit a été annuller avec succes !!!");
    res.redirect('/');
});


//Route pour se deconnecter
router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/');
});


module.exports = router;