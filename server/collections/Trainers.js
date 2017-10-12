var Bookshelf = require('../config/db').bookshelf;
var Trainer = require('../models/Trainer').models;

var Trainers =  Bookshelf.Collection.extend({
    model: Trainer
});

module.exports.collections = Bookshelf.collection('Trainers', Trainers);