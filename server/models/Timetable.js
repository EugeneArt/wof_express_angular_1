var Bookshelf = require('../config/db').bookshelf;

var Exercise = require("./Exercise").models;
var Trainer = require("./Trainer").models;
var Gym = require("./Gym").models;
var Level = require("./Level").models;

var Timetable = Bookshelf.Model.extend({
    tableName: 'timetable',
    exercise: function () {
        return this.belongsTo(Exercise,'exercise_id');
    },
    trainer: function () {
        return this.belongsTo(Trainer,'trainer_id');
    },
    gym: function () {
        var Gym = require("./Gym").models;
        return this.belongsTo(Gym,'gym_id');
    },
    level: function () {
        var Level = require("./Level").models;
        return this.belongsTo(Level,'level_id');
    }
});
module.exports.models = Bookshelf.model('Timetable',Timetable);
