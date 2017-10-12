var Bookshelf = require('../config/db').bookshelf;
var Level = require('../models/Level').models;

var Levels =  Bookshelf.Collection.extend({
    model: Level
});

module.exports.collections = Bookshelf.collection('Levels', Levels);