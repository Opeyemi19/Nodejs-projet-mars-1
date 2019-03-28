const express = require('express');
// const SesionStog = require('sessionstorage');

const db = require('../database');

const passport = require('passport');

const {  isLoggedIn } = require('../lib/authenfction');

const router = express.Router();


// router.get('/', (req, res) => {
//     res.send('Hello !!');
// });

//Route pour l'affichage des donnees a partir de la BD ds ntre page 'links'
router.get('/', async (req, res) => {
    const links = await db.query('SELECT * FROM boulangerie');
        //test pour afficher les elements de la bd
    // console.log(link);
    // res.send('Bien afficher');

        //On peut faire {link: link} d'ou il sera bon de faire un {link} out simple ctd 'link' va recevoir la valeurde 'links' afin d'utiliser le 'link' ds ntre page list.hbs en faisant un For qui est 
        // representer de la facon suivante {{#each}}
    res.render('index', { links, title:'Acceuil' });
    // res.render('index', { link });
});


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const link = await db.query('SELECT * FROM boulangerie WHERE id = ?', [id]);
    res.render('detailProduit', {link, title: 'Details'});
        
        //test 
    // console.log(id);
    // res.send('Editer');
});

    //Cme il est deja definir ds le fichier (authentify) dc il n' agira pas ici mais pour Le POST il va agi Ici car
    // sans le (router.post('/profil', isLoggedIn, (req, res)) il va afficher une inexistante de route lors du post de ma 'COMMANDE' 
    //Et une fois connecte au par avant s'il veut commander il ne va plus etre oblige de faire le 'login' mais si n'est pas connecte 
    //il va lui demander de se logger bien avant l'ajout du produit
// router.get('/profil', (req, res) => {
//     res.render('profil');
// });

router.post('/profil', isLoggedIn, async(req, res) => {
    // const {id} = req.params;
    // console.log(id);

    const { name_prod, price_prod, image } = req.body;

    const AddCommand = { name_prod, price_prod, image, users_id: req.user.id };

    await db.query('INSERT INTO panier set ?', [AddCommand]);
    req.flash('success', 'Commande enregistrer avec succes veuillez verifier votre Profil');
    res.redirect('/profil');
});



module.exports = router;