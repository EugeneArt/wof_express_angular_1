var express = require('express');
var router = express.Router();

var Levels = require('../collections/Levels').collections;
var Level  = require('../models/Level').models;


router.get('/', function (req, res) {
    Levels.forge()
        .fetch()
        .then(function (collection) {
            res.json(collection.toJSON());
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.get('/:id', function (req, res) {
    Level.forge({id: req.params.id})
        .fetch()
        .then(function (level) {
            if (!level) {
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: level.toJSON()});
            }
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.post('/', function (req, res) {
    Level.forge({
        level_name: req.body.level_name,
        level_color: req.body.level_color
    })
        .save()
        .then(function (level) {
            res.json({error: false, data: {id: level.get('id')}});
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.put('/:id', function (req, res) {
    Level.forge({id: req.params.id})
        .fetch({require: true})
        .then(function (level) {
            level.save({
                level_name: req.body.level_name || level.get('level_name')
            })
                .then(function () {
                    res.json({error: false, data: {message: 'Level details updated'}});
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
    Level.forge({id: req.params.id})
        .fetch({require: true})
        .then(function (level) {
            level.destroy()
                .then(function () {
                    res.json({error: true, data: {message: 'Level successfully deleted'}});
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
