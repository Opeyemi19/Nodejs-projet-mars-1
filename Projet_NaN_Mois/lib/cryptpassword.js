const bcrypt = require('bcryptjs');

const cryptage = {};

//Pour crypter le password de l'user
cryptage.encryptPassword = async(password) => {
        //Il ns dit la dimension pour avoir un password crypter
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

//Pour comparer le password entrez a celui enregistrer en ds ntre bd, Lorsqu on veut se logger
cryptage.matchPassword = async(password, savedPassword) => {
    try {
       return await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.log(error);
    }
};


module.exports = cryptage;