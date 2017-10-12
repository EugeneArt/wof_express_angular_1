var Bookshelf = require('../config/db').bookshelf;
var Timetable = require("./Timetable").models;

var Exercise = Bookshelf.Model.extend({
    tableName: 'exercises'
});
module.exports.models = Bookshelf.model('Exercise',Exercise);