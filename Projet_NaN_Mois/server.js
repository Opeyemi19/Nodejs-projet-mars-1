require('babel-register');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
    //pour faire fonctionner les flash on a besoin des Modules 'connect-flash, express-session, express-mysql-session 
    // et la connexion a la Bd qui se trouve ds (connect.js)'
const flash = require('connect-flash');
const session = require('express-session');
const MysqlStore = require('express-mysql-session');
const passport = require('passport');

// const fileUpload = require('express-fileupload')

// fileUpload({
//     limits: { fileSize: 50 * 1024 * 1024 }
//   })

const { database } = require('./connect');

//Initialisations
const app = express();
// const multer = require('express-fileupload');

require('./lib/passport');

//Settings
app.set('port', process.env.PORT || 8090);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/datefction')
}));
app.set('view engine', '.hbs');


// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));


//Middleware
    // MySQLStore() 
app.use(session({
    secret: 'mysqlnodeseession',
    resave: false,
    saveUninitialized: false,
    store: new MysqlStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
    
            //on ajoute des middleware de passport et express-session pour s'authentifier a ntre compte 
        //Pour l'initialiser 'passport.initialize()' on va faire appel a ntre fichier 'passport' ds "lib" 
app.use(passport.initialize());
    //Pour utiliser les 'passport.initialize()' on doit les faits acompagne de 'session'
app.use(passport.session());
// app.use(fileUpload());


//Global Variables

    //Se sont des elements Globale tels que (req, res, next) qui seront appelle partout ds ntre Projet  et 
    //la fction 'next()' permet de continue l execution des autres programm suivant
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})


//Routes
        //Pour afficher les Produits ajouter ds BD, ds la partie de ntre (index'qui ntre acceuil' et ds la partie admins'qui ns permet de suprime ou editer')
        //alors il faut  placee d'abord la route "app.use('/admins', require('./controllers/admins'));" avant celle de "app.use(require('./controllers/index'));" qui ntre 'index'
app.use('/admins', require('./controllers/admins'));
app.use(require('./controllers/authentify'));
app.use(require('./controllers/index'));
// app.use('/panier', require('./controllers/panier'));
// app.use('/sign', require('./controllers/authentify'));


//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});