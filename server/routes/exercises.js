var express = require('express');
var router = express.Router();

var Exercises = require('../collections/Exercises').collections;
var Exercise  = require('../models/Exercise').models;
var upload = require('../helpers/uploader');
var remover = require('../helpers/remover');

var resizer = require('../helpers/resizer');
const fs = require('fs');

router.get('/', function (req, res) {
    Exercises.forge()
        .fetch()
        .then(function (collection) {
            res.json(collection.toJSON());
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.get('/:id', function (req, res) {
    Exercise.forge({id: req.params.id})
        .fetch()
        .then(function (exercise) {
            if (!exercise) {
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: exercise.toJSON()});
            }
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (err) console.log("Error!");

        if (req.files['file']) {
            var video = "./uploads/" + req.files['file'][0].filename;
        }

        if (req.files['files']) {
            var images = [];
            req.files['files'].forEach(function (file) {

                resizer.resize(file.path, file.filename);
                images.push(file.filename);
            });
            var imgs = images.join(';');
        }

        Exercise.forge({
            exercise_name: req.body.exercise_name,
            exercise_description: req.body.exercise_description,
            exercise_video: video,
            exercise_images: imgs
        })
            .save()
            .then(function (exercise) {
                res.json({error: false, data: {id: exercise.get('id')}});
            })
            .otherwise(function (err) {
                res.status(500).json({error: true, data: {message: err.message}});
            });

    });
});

router.put('/:id', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log("Error!");
        }
        if (req.body.file === undefined) {
            var video = "./uploads/" + req.files['file'][0].filename;
        }
        if (req.body.files === undefined) {
            var images = [];
            req.files['files'].forEach(function (file) {
                resizer.resize(file.path, file.filename);
                images.push(file.filename);
            });
            var imgs = images.join(';');
        }
        Exercise.forge({id: req.params.id})
            .fetch({require: true})
            .then(function (exercise) {
                var attr = exercise.attributes;
                if (video) {
                    remover.removeVideo(attr.exercise_video);
                }
                if (imgs) {
                    remover.removeImage(attr.exercise_images);
                    remover.removeImageThumbnails(attr.exercise_images);
                }
                exercise.save({
                    id: req.body.id,
                    exercise_name: req.body.exercise_name || exercise.get('exercise_name'),
                    exercise_description: req.body.exercise_description || exercise.get('exercise_description'),
                    exercise_video: req.body.file  || video,
                    exercise_images: req.body.files || imgs
                })
                    .then(function () {
                        res.json({error: false, data: {message: 'Exercise details updated'}});
                    })
                    .otherwise(function (err) {
                        res.status(500).json({error: true, data: {message: err.message}});
                    });
            })
            .otherwise(function (err) {
                res.status(500).json({error: true, data: {message: err.message}});
            });
    });
});

router.delete('/:id', function (req, res) {

    Exercise.forge({id: req.params.id})
        .fetch({require: true})
        .then(function (exercise) {
            var attr = exercise.attributes;
            remover.removeVideo(attr.exercise_video);
            remover.removeImage(attr.exercise_images);
            remover.removeImageThumbnails(attr.exercise_images);
            exercise.destroy()
                .then(function () {
                    res.json({error: true, data: {message: 'Exercise successfully deleted'}});
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
