var express = require('express');
var router = express.Router();

var Trainers = require('../collections/Trainers').collections;
var Trainer  = require('../models/Trainer').models;
var upload = require('../helpers/uploader');
var remover = require('../helpers/remover');
var resizer = require('../helpers/resizer');

router.get('/', function (req, res) {
    Trainers.forge()
        .fetch()
        .then(function (collection) {
            res.json(collection.toJSON());
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.get('/:id', function (req, res) {
    Trainer.forge({id: req.params.id})
        .fetch()
        .then(function (trainer) {
            if (!trainer) {
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: trainer.toJSON()});
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
            var image = req.files['file'][0].filename;
            resizer.resize( req.files['file'][0].path, image)
        }
        Trainer.forge({
            trainer_name: req.body.trainer_name,
            trainer_tagline: req.body.trainer_tagline,
            trainer_achievements: req.body.trainer_achievements,
            trainer_img: image
        })
            .save()
            .then(function (trainer) {
                res.json({error: false, data: {id: trainer.get('id')}});
            })
            .otherwise(function (err) {
                res.status(500).json({error: true, data: {message: err.message}});
            });

    });
});

router.put('/:id', function (req, res) {
    upload(req, res, function (err) {
        if (err) console.log("Error!");
        if (req.files['file']) {
            var image = req.files['file'][0].filename;
            resizer.resize( req.files['file'][0].path, image)
        }
        Trainer.forge({id: req.params.id})
            .fetch({require: true})
            .then(function (trainer) {
                var attr = trainer.attributes;
                if (image){
                    remover.removeImage(attr.trainer_img);
                    remover.removeImageThumbnails(attr.trainer_img);
                }
                trainer.save({
                    id: req.body.id,
                    trainer_name: req.body.trainer_name || trainer.get('trainer_name'),
                    trainer_tagline: req.body.trainer_tagline || trainer.get('trainer_tagline'),
                    trainer_achievements: req.body.trainer_achievements || trainer.get('trainer_achievements'),
                    trainer_img: req.body.file || image
                })
                    .then(function () {
                        res.json({error: false, data: {message: 'Trainer details updated'}});
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
    Trainer.forge({id: req.params.id})
        .fetch({require: true})
        .then(function (trainer) {
            var attr = trainer.attributes;
            remover.removeImage(attr.trainer_img);
            remover.removeImageThumbnails(attr.trainer_img);
            trainer.destroy()
                .then(function () {
                    res.json({error: true, data: {message: 'Trainer successfully deleted'}});
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