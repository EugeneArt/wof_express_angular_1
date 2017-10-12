var express = require('express');
var _ = require('lodash');
var router = express.Router();

var Timetables = require('../collections/Timetables').collections;
var Timetable  = require('../models/Timetable').models;

router.get('/', function (req, res) {
    Timetables
        .forge()
        .fetch(
            {withRelated: [ 'exercise', 'trainer', 'gym', 'level']}
        )
        .then(function (collection) {
            var groupByGym = _.groupBy(collection.toJSON(),'gym.gym_name');
            res.json(groupByGym);

        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});



router.get('/:id', function (req, res) {
    Timetable.forge({id: req.params.id})
        .fetch(
            {withRelated: ['exercise','trainer','gym','level']}
        )
        .then(function (timetable) {
            if (!timetable) {
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: timetable.toJSON()});
            }
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.post('/', function (req, res) {
    Timetable.forge({
        hour: req.body.hour,
        day: req.body.day,
        gym_id: req.body.gym_id,
        exercise_id: req.body.exercise_id,
        trainer_id: req.body.trainer_id,
        level_id: req.body.level_id
    })
        .save()
        .then(function (timetable) {
            console.log(timetable);
            res.json({error: false, data: {id: timetable.get('id')}});
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.put('/:id', function (req, res) {
    Timetable.forge({id: req.params.id})
        .fetch({require: true})
        .then(function (timetable) {
            timetable.save({
                hour: req.body.hour  || timetable.get('hour'),
                day: req.body.day || timetable.get('day'),
                gym_id: req.body.gym.id || timetable.get('gym'),
                exercise_id: req.body.exercise.id || timetable.get('exercise'),
                trainer_id: req.body.trainer.id || timetable.get('trainer'),
                level_id: req.body.level.id || timetable.get('level')
            })
                .then(function () {
                    res.json({error: false, data: {message: 'Timetable details updated'}});
                })
                .otherwise(function (err) {
                    res.status(500).json({error: true, data: {message: err.message}});
                });
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.delete('/:id', function (req, res) {
    Timetable.forge({id: req.params.id})
        .fetch({require: true})
        .then(function (timetable) {
            timetable.destroy()
                .then(function () {
                    res.json({error: true, data: {message: 'Timetable successfully deleted'}});
                })
                .otherwise(function (err) {
                    res.status(500).json({error: true, data: {message: err.message}});
                });
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

module.exports = router;