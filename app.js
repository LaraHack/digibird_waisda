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

var routes = require('./routes/index');
// var users = require('./routes/users');

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
app.use('/', routes);
// app.use('/users', users);

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

var conn = connection.init_connection();
connection.acquire_connection(conn, function(err){
  if (!err) {
    console.log('connected as id ' + conn.threadId);
  } else {
    console.error('error connecting: ' + err.stack);
    return;
  }

  conn.end(function(err){
    // Do something after the connection is gracefully terminated.
    console.log("Connection terminated!");
  });
});

// var pool = connection.init_pool(10);
// connection.acquire_pool(pool, function(err, connection) {
//     if (!err) {
//       console.log('connected as id ' + connection.threadId);
//
//       // release it
//       connection.release();
//       // connection released ot the pool
//       console.log("Connection released!");
//     } else {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
// });

app.set('port', process.env.PORT || 3010);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
