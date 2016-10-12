/*******************************************************************************
game

Database operations regarding the Game table

Endpoint | Request type | Method

/game | GET | getNoGames
/*******************************************************************************/
var connection = require('../middlewares/connection');

// query options
var options = {
  sql: '',
  timeout: 30000, // 30s
  values: []
};

module.exports = {
  // GET total number of games
  getNoGames: function (res) {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
          if (!err) {
            var db = connection.config.database;
            var queryNoTags = 'SELECT ' + db + '.sf_no_games();';

            options.sql = queryNoTags;

            connection.query(options, function(err, rows, fields) {
                if (!err) {
                  // get name of returned variable that contains the result
                  var nameVarNoGames = fields[0].name;
                  // get result
                  var noGames = rows[0][nameVarNoGames];
                  resolve(noGames);
                }
              });

            // release the connection
            connection.release();
            // connection released to the pool
            console.log("Connection released!");
          } else {
            console.error('error connecting: ' + err.stack);
            reject(err.stack);
          }
      });
    });
  }
};
