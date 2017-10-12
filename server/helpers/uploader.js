var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client-angular/uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = process.hrtime();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});


var upload = multer({
    storage: storage
}).fields([{ name: 'file', maxCount: 1 }, { name: 'files', maxCount: 10 }]);

module.exports = upload;
