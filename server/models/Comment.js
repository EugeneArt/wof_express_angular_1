var Bookshelf = require('../config/db').bookshelf;

var Comment = Bookshelf.Model.extend({
    tableName: 'comments'
});
module.exports.models = Bookshelf.model('Comment',Comment);