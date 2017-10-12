var express = require('express');
var router = express.Router();

var Comments = require('../collections/Comments').collections;
var Comment  = require('../models/Comment').models;


router.get('/', function (req, res) {
    Comments.forge()
        .fetch()
        .then(function (comment) {
            res.json(comment.toJSON());
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.get('/:id', function (req, res) {
    Comment.forge({id: req.params.id})
        .fetch()
        .then(function (comment) {
            if (!comment) {
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: comment.toJSON()});
            }
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.post('/', function (req, res) {
    Comment.forge({
            name: req.body.name,
            comment: req.body.comment
        })
        .save()
        .then(function (comment) {
            res.json({error: false, data: {id: comment.get('id')}});
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.put('/:id', function (req, res) {
    Comment.forge({id: req.params.id})
        .fetch({require: true})
        .then(function (comment) {
            comment.save({
                name: req.body.name || comment.get('name'),
                comment: req.body.comment || comment.get('comment')
            })
                .then(function () {
                    res.json({error: false, data: {message: 'Comment details updated'}});
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
    Comment.forge({id: req.params.id})
        .fetch({require: true})
        .then(function (comment) {
            comment.destroy()
                .then(function () {
                    res.json({error: true, data: {message: 'Comment successfully deleted'}});
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