var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var comments = require('./routes/comments');
var gyms = require('./routes/gyms');
var exercises = require('./routes/exercises');
var trainers = require('./routes/trainers');
var levels = require('./routes/levels');
var banners = require('./routes/banners');
var filters = require('./routes/filters');
var timetables = require('./routes/timetables');

var app = express();

var corsOptions = {
    origin: '*'
};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/', index);
app.use('/comments', comments);
app.use('/gyms', gyms);
app.use('/exercises', exercises);
app.use('/trainers', trainers);
app.use('/levels', levels);
app.use('/banners', banners);
app.use('/filters', filters);
app.use('/timetables', timetables);

/*
*********************Validate error**************************
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
