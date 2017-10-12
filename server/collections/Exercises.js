var Bookshelf = require('../config/db').bookshelf;
var Exercise = require('../models/Exercise').models;

var Exercises =  Bookshelf.Collection.extend({
    model: Exercise
});

module.exports.collections = Bookshelf.collection('Exercises',Exercises);