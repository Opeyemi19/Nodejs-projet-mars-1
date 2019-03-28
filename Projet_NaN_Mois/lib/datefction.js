//Cet fichier permet de faire la manipulation de la date car on ne veut pas aussi l'affiché comme de la maniere qu'il est ds la BD 

const { format } = require('timeago.js');
// const timeagoInstance = timeago();

const ChangDate = {};

ChangDate.timeago = (timestamp) => {
   return format(timestamp);
};


module.exports = ChangDate;