//Cette route permet de 'creer, afficher, lister, eliminer' les elements de ntre Projet et la connection a la BD 

//On peut mettre a la place de  const 'db' une autre const cme pool et ce que l'on veut
const db = require('../database');
// const { isLoggedIn } = require('../lib/authenfction');
const express = require('express');

// const multer = require('express-fileupload');
const path = require('path');

/*const storageProfil = multer.diskStorage({
    destination: '/uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' +file.originalname);
    }
});
let uploadService = multer({
    storage: storageProfil,
}).single('image');*/

const {  isLoggedIn } = require('../lib/authenfction');
const upload = require('../lib/uplodimage');

const router = express.Router();

//Route au fichier (links/add) pour avoir a la page d'abord et arrive sur la page on cherche a faire ntre post de formulaire
//Cela sera Appelle ds la route (ajout ds la BD)
router.get('/add', isLoggedIn, (req, res) => {
    res.render('admins/add', {
        title: 'Admin Ajout'
    });
});

router.post('/add', isLoggedIn, upload.single('image'), async(req, res) => {
    // console.log(JSON.stringify(req))
    /*let sampleFile = req.files.image;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(__dirname+'/uploads/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });*/

    // const { name_pain, price_pain, description, image: file, } = req.body;
            //Ici c est sans le 'req.user.id' qui permet a chaque user de voir c'est propre elements ajouter cme admin
    // const newAdd = { 
    //     name_pain,
    //     price_pain,
    //     description   
    //  };

    // await db.query('INSERT INTO boulangerie set ?', [newAdd]);

        //Avec 'req.user.id'
    const { name_pain, price_pain, description } = req.body;
    // console.log(req.file);
    const newAdd = { 
        name_pain,
        price_pain,
        description,
        image:req.file.filename,
        user_id: req.user.id 
     };


    
    await db.query('INSERT INTO boulangerie set ?', [newAdd]);

    req.flash('success', 'Enregistrement effectué avec succes');
    // res.redirect('/');
    res.redirect('/admins');
});


//Route pour l'affichage des donnees a partir de la BD ds ntre page 'links'
router.get('/', isLoggedIn, async (req, res) => {

            //C'est la requete avant l'usage de '[req.user.id]'
    // const link = await db.query('SELECT * FROM boulangerie');

            //C'est la requete avec user_id = ? qui est va afficher les Produits ajoute par la personne ayant 'id' qui a ete enregistrer lors de l'ajout
    const link = await db.query('SELECT * FROM boulangerie WHERE user_id = ?', [req.user.id]);

        //test pour afficher les elements de la bd
    // console.log(link);
    // res.send('Bien afficher');

        //On peut faire {link: link} d'ou il sera bon de faire un {link} out simple ctd 'link' va recevoir la valeurde 'links' afin d'utiliser le 'link' ds ntre page list.hbs en faisant un For qui est 
        // representer de la facon suivante {{#each}}
    res.render('admins/list', { link, title: 'Admin liste' });
    // res.render('index', { link });
});


//Pour supprimer un element ds la BD
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM boulangerie WHERE ID = ?', [id]);
    req.flash('success', "Le Produit a été supprimer avec succes !!!");
    res.redirect('/admins');
});

//Pour modifier un element ds la BD
    //1er partie
    router.get('/edit/:id', isLoggedIn, async (req, res) => {
        const { id } = req.params;
        const link = await db.query('SELECT * FROM boulangerie WHERE id = ?', [id]);
        res.render('admins/edit', {lin: link[0]});
            
            //test 
        // console.log(id);
        // res.send('Editer');
    });

//Pour modifier un element ds la BD
    //2eme partie
    router.post('/edit/:id', isLoggedIn, async (req, res) => {
        const { id } = req.params;
        const { name_pain, price_pain, description } = req.body;
        const newAdd = { 
            name_pain,
            price_pain,
            description   
        };
        await db.query('UPDATE boulangerie set ? WHERE id = ?', [newAdd, id]);
        req.flash('success',"Merci d' avoir modifier le Produit !!!");    
        res.redirect('/admins');            
    });



module.exports = router;