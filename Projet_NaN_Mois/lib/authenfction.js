//Permet de veirifier si user s est logger

module.exports = {
    //S'il s est logger alors on continue a executé la suite du code Ou on va mettre la var qui recoit le chemin de ntre fction 
 isLoggedIn(req, res, next) {
     if (req.isAuthenticated()) {
         return next();
     }
         //ds le cas contraire il le fait retourner a la page de connexion
     return res.redirect('/signin');
 },
         //permet de pas ne pas vouloir aller sur une autre page de connexion sans ne pas se deconnecter au prealabe et aussi de ne pas avoir acces a sa partie 'signup' ctd Creation de son compte
 isNotLoggedIn(req, res, next) {
     if (!req.isAuthenticated()) {
         return next();
     }
         //ds le cas contraire il le fait retourner a la page de connexion
     return res.redirect('/profil');
 }

};