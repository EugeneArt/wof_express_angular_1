var express = require('express');
var router = express.Router();

var Gyms = require('../collections/Gyms').collections;
var Gym  = require('../models/Gym').models;


router.get('/', function (req, res) {
    Gyms.forge()
        .fetch()
        .then(function (collection) {
            res.json(collection.toJSON());
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.get('/:id', function (req, res) {
    Gym.forge({id: req.params.id})
        .fetch()
        .then(function (gym) {
            if (!gym) {
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: gym.toJSON()});
            }
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.post('/', function (req, res) {
    Gym.forge({
        gym_name: req.body.gym_name
    })
        .save()
        .then(function (gym) {
            res.json({error: false, data: {id: gym.get('id')}});
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.put('/:id', function (req, res) {
    Gym.forge({id: req.params.id})
        .fetch({require: true})
        .then(function (gym) {
            gym.save({
                gym_name: req.body.gym_name || gym.get('name')
            })
                .then(function () {
                    res.json({error: false, data: {message: 'Gym details updated'}});
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
    Gym.forge({id: req.params.id})
        .fetch({require: true})
        .then(function (gym) {
            gym.destroy()
                .then(function () {
                    res.json({error: true, data: {message: 'Gym successfully deleted'}});
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
