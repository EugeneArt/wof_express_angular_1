var Bookshelf = require('../config/db').bookshelf;
var Timetable = require("./Timetable").models;

var Level = Bookshelf.Model.extend({
    tableName: 'levels'
});

module.exports.models = Bookshelf.model('Level', Level);