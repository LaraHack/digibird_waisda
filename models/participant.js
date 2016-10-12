/*******************************************************************************
participant

Database operations regarding the Participant table

Endpoint | Request type | Method

/player | GET | getNoPlayers
/*******************************************************************************/
var connection = require('../middlewares/connection');

// query options
var options = {
  sql: '',
  timeout: 30000, // 30s
  values: []
};

module.exports = {
  // GET total number of players
  getNoPlayers: function () {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
          if (!err) {
            var db = connection.config.database;
            var queryNoPlayers = 'SELECT ' + db + '.sf_no_participants();';

            options.sql = queryNoPlayers;

            connection.query(options, function(err, rows, fields) {
                if (!err) {
                  // get name of returned variable that contains the result
                  var nameVarNoPlayers = fields[0].name;
                  // get result
                  var noPlayers = rows[0][nameVarNoPlayers];
                  // resolve promise and send response
                  resolve(noPlayers);
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
