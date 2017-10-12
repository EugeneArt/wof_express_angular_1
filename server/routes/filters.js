"use strict";
var express = require('express');
var _ = require('lodash');
var router = express.Router();

var Timetables = require('../collections/Timetables').collections;
var Timetable  = require('../models/Timetable').models;
var Hour = require('../helpers/hour');

router.get('/', function (req, res) {
    if(req.query.hasOwnProperty("hour")){

        Hour.setHour(req.query.hour);
        delete req.query["hour"];
        var hour = Hour.getHour();
        var prevHour = Hour.getPrevHour();

        Timetable
            .forge()
            .query(function (qb) {
                qb.where(function () {
                   this.where('hour', 'LIKE',hour+'%');
                   for(var item in req.query){
                       this.where(item,req.query[item]);
                   }
                });
                qb.orWhere(function () {
                    this.where('hour', 'LIKE',prevHour+'%');
                    for(var item in req.query){
                        this.where(item,req.query[item]);
                    }
                });
            })
            .fetchAll(
                {withRelated: ['exercise','trainer','gym','level']}
            )
            .then(function (timetable) {
                if (!timetable) {
                    res.status(404).json({error: true, data: {}});
                }
                else {
                    var groupBy = _.groupBy(timetable.toJSON(),'gym.gym_name');
                    res.json(groupBy);
                }
            })
            .otherwise(function (err) {
                res.status(500).json({error: true, data: {message: err.message}});
            });
    } else{
        Timetable
            .forge()
            .where(req.query)
            .fetchAll(
                {withRelated: ['exercise','trainer','gym','level']}
            )
            .then(function (timetable) {
                if (!timetable) {
                    res.status(404).json({error: true, data: {}});
                }
                else {
                    var groupBy = _.groupBy(timetable.toJSON(),'gym.gym_name');
                    res.json(groupBy);
                }
            })
            .otherwise(function (err) {
                res.status(500).json({error: true, data: {message: err.message}});
            });
    }

});

module.exports = router;