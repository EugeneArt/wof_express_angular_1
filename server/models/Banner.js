var Bookshelf = require('../config/db').bookshelf;

var Banner = Bookshelf.Model.extend({
    tableName: 'banners'
});
module.exports.models = Bookshelf.model('Banner',Banner);