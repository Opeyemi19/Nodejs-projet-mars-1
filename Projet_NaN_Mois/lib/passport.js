//Ce fichier ns permet de faire de se Logger et de faire aussi le Login cme users grace au module 'passport'

//Passport un moyen de verifaction des infos de l user afin de valider sa connexion par le systeme de 'sérialisation et de désérialisation'

const passport = require('passport');

    //'passport-local' Permet de s authentifier à l'aide d'un nom d'utilisateur et d'un mot de passe 
const LocalStrategy = require('passport-local').Strategy;
// const SessionStrag = require('sessionstorage');

//Pour se connecter a la BD
const db = require('../database');

const cryptage = require('../lib/cryptpassword');



//Pour Le Login et le Signin
passport.use('local.signin', new LocalStrategy ({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
        // console.log(req.body);
        // console.log(username);
        //console.log(password);

    const rows = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length > 0) {
        //Si le nom entrer existe il fait ses prossessus si le 'username et password' son correct il ns ramene sur son profil
        const user = rows[0];
        const validPassword = await cryptage.matchPassword(password, user.password);
        if (validPassword) {
            done(null, user, req.flash('success', 'Welcome  ' + user.username));
            // SessionStrag.setItem('statut', user.statut);
            // let statut = SessionStrag.getItem('statut');
            // console.log(statut);
        } else {
            done(null, false, req.flash('message','Incorect Password'));
        }
    }
    else{
        //ds le cas contraire il retourne que le nom n existe pas
        return done(null, false, req.flash('message','The Username does not exists'));
    }


}));



//(usernameField et passwordField) Permet de faire la verification si l' utilisater a entrer des donnees lors de la creaction de ntre compte ds les deux champs (username et password), 
//ds cas contraire  le s 'done' est une callback
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    // console.log(req.body);

    const { fullname, statut } = req.body;
    const newUser = {
        username,
        password,
        fullname,
        statut
    };
    
    //Lors de l'insertion des données de l' users ds la BD on aura un password crypter avec la fction 'encryptPassword'
            //newUser.password permet de que on parle de l element 'password'
    newUser.password = await cryptage.encryptPassword(password)

    const result = await db.query('INSERT INTO users SET ?', [newUser]);
        //test pour voir le resultat de insert avec password crypter
    // console.log(result);

    //Si l'insertion est OK il 'newUser.id' recuperera l' 'id' de l'element qui vient d'etre entre grace a "insertId" car qu'on a fait le console.log de 'result'
    // on a eu des resulat et 'insertId' avait la valeur de l' "ID" enregistrer qd le post a eu lieu
    newUser.id = result.insertId;
    
    //Dc on va retourner alors ntre callback done(null, newUser) avec 'null' qui montre qui n a recu aucun erreur et newUser
    return done(null, newUser);

}));



        //la fction passport serializeUser stockées 'id' de utilisateur  dans la session afin de faire afficher sesdonnes ds pass,deserilizer

        //il sauvegarde ID utilisateur et à rechercher l'utilisateur par ID lors de la désérialisation.
//'user' Represente le "user" qui sera ds ntre nav.hbs et ce 'user' retoune les colonnes(elements) dont son 'id' a ete retourner
//par 'result.insertId' et le retourne de ntre elements du 'newUser' mais 
//le  'passport.serializeUser' ns permet d'avoir 'id' de l'utilsateur qui c'est enregistrer
passport.serializeUser((user, done) => {
    done(null, user.id);
});


//
passport.deserializeUser(async(id, done) => {
    //On aura alors l'affichage des elements de la ligne dont 'id' 
    const rows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    //Il va retouner ntre callback du "rows[0]"  et [0] est par conevntion car il va afficher les elemnts de ntre de la ligne de ntre BD partant de l'indice 0 
    done(null, rows[0]);
});


// Handlebars.registerHelper('ifCond', function(v1, v2, options) {
//     if(v1 === v2) {
//       return options.fn(this);
//     }
//     return options.inverse(this);
//   });

// {{#ifCond v1 v2}}
//     {{v1}} is equal to {{v2}}
// {{else}}
//     {{v1}} is not equal to {{v2}}
// {{/ifCond}}