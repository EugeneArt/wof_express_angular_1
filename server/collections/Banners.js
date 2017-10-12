var Bookshelf = require('../config/db').bookshelf;
var Banner = require('../models/Banner').models;

var Banners =  Bookshelf.Collection.extend({
    model: Banner
});

module.exports.collections = Bookshelf.collection('Banners', Banners);