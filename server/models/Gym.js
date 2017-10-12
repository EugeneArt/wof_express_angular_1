var Bookshelf = require('../config/db').bookshelf;
var Timetable = require("./Timetable").models;

var Gym = Bookshelf.Model.extend({
    tableName: 'gyms'
});

module.exports.models = Bookshelf.model('Gym', Gym);