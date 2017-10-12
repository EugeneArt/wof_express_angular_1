var Bookshelf = require('../config/db').bookshelf;
var Comment = require('../models/Comment').models;

var Comments =  Bookshelf.Collection.extend({
    model: Comment
});

module.exports.collections = Bookshelf.collection('Comments',Comments);