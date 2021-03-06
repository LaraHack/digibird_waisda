/*****************************************************
app

Initializes the app and glues everything together
*****************************************************/
'use strict';

var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var home = require('./routes/index');
var video = require('./routes/video');
var tag = require('./routes/tag');
var game = require('./routes/game');
var participant = require('./routes/participant');
var dictionary = require('./routes/dictionary');
var synonym = require('./routes/synonym');
var statistics = require('./routes/statistics');

var connection = require('./middlewares/connection');

var app = express();

// define express static middleware
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// cookie and body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// routes
app.use('/', home);
app.use('/video', video);
app.use('/tag', tag);
app.use('/game', game);
app.use('/player', participant);
app.use('/dictionary', dictionary);
app.use('/synonym', synonym);
app.use('/statistics', statistics);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message
    });
});

// initialize database connection
// single connection
// connection.initConnection();
// pooling connections
connection.initPool(10);

app.set('port', process.env.PORT || 3010);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
