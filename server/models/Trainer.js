var Bookshelf = require('../config/db').bookshelf;
var Timetable = require("./Timetable").models;

var Trainer  = Bookshelf.Model.extend({
    tableName: 'trainers'
});
module.exports.models = Bookshelf.model('Trainer', Trainer);