var Bookshelf = require('../config/db').bookshelf;
var Timetable = require('../models/Timetable').models;

var Timetables =  Bookshelf.Collection.extend({
    model: Timetable
});

module.exports.collections = Bookshelf.collection('Timetables',Timetables);