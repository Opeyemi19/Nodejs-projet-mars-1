const mysql = require('mysql');

//On creer une var qui est ds un objet et qui recoit une "require de 'util'" 
const { promisify } = require('util');

const { database } = require('./connect');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    
    //Pour les cdition lors des Erreur avec la db et il retournera une erreur ds la console.error
    if (err) {
        if (err.code === 'PROTOCOL_CONNEXION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');            
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }

    }

    if(connection) connection.release();
    console.log('Connexion avec la BD est reussi');
    return;
});

//Promisify Pool Querys 'On a fait une querie sur ntre "pool" qui est une des module de 'mysql' de qui permet de crer 1e connection a bd'
pool.query = promisify(pool.query);

module.exports = pool;