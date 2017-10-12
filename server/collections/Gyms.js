var Bookshelf = require('../config/db').bookshelf;
var Gym = require('../models/Gym').models;

var Gyms =  Bookshelf.Collection.extend({
    model: Gym
});

module.exports.collections = Bookshelf.collection('Gyms', Gyms);