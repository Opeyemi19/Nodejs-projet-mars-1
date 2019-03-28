const multer = require('multer');
const path = require('path');

module.exports = multer({
        storage: multer.diskStorage({
        destination: 'public/uploads/',
        // destination: function (req, file, cb) {
        //     cb(null, '/uploads/')
        //   },
        filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname));
    }
    }),
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/jpg|jpeg|png|gif$i/)) {
            cb(new Error('File is not supported'), false)
            return
        }

        cb(null, true)
    }
});