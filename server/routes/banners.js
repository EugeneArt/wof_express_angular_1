var express = require('express');
var router = express.Router();

var Banners = require('../collections/Banners').collections;
var Banner = require('../models/Banner').models;

var upload = require('../helpers/uploader');
var remover = require('../helpers/remover');

router.get('/', function (req, res) {
    Banners.forge()
        .fetch()
        .then(function (banner) {
            res.json(banner.toJSON());
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.get('/:id', function (req, res) {
    Banner.forge({id: req.params.id})
        .fetch()
        .then(function (banner) {
            if (!banner) {
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: banner.toJSON()});
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
        }
        Banner.forge({
            name: req.body.name,
            image_url: image
        })
            .save()
            .then(function (banner) {
                res.json({error: false, data: {id: banner.get('id')}});
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
        }
        // select current Banner
        if(req.body.is_used == 1) {
            Banners.forge()
                .fetch()
                .then(function (banner) {
                    banner.forEach(function (item) {
                        if (req.body.id == item.id) return;
                        Banner.forge({id: req.params.id})
                            .fetch({require: true})
                            .then(function (banner) {
                                banner.save({
                                    id: item.id,
                                    name: item.name,
                                    image_url: item.image_url,
                                    is_used: 0
                                });
                            })
                    });
                })
        }

        Banner.forge({id: req.params.id})
            .fetch({require: true})
            .then(function (banner) {
                var attr = banner.attributes;
                if (image){
                    remover.removeImage(attr.image_url);
                }
                banner.save({
                    id: req.body.id,
                    name: req.body.name || banner.get('name'),
                    image_url: req.body.file || image,
                    is_used: req.body.is_used || 0
                })
                    .then(function () {
                        res.json({error: false, data: {message: 'Banner details updated'}});
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
    Banner.forge({id: req.params.id})
        .fetch({require: true})
        .then(function (banner) {
            var attr = banner.attributes;
            remover.removeImage(attr.image_url);
            banner.destroy()
                .then(function () {
                    res.json({error: true, data: {message: 'Banner successfully deleted'}});
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