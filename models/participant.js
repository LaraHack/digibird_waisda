/*******************************************************************************
video

Database operations regarding the Video table

Endpoint | Request type | Method

/video | GET | getNoVideos
/video?enabled=true | GET | getNoEnabledVideos
/video/title/:title | GET | getVideo(':title')
/video | POST | insertVideo
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
  getNoParticipants: function (res) {
    connection.acquirePool(function(err, connection) {
        if (!err) {
          var db = connection.config.database;
          var queryNoParticipants = 'SELECT ' + db + '.sf_no_participants();';

          options.sql = queryNoParticipants;

          connection.query(options, function(err, rows, fields) {
              if (!err) {
                // get name of returned variable that contains the result
                var nameVarNoParticipants = fields[0].name;
                // get result
                var noParticipants = rows[0][nameVarNoParticipants];
                // stringify result
                var jsonResponse = JSON.stringify({'noParticipants': noParticipants});

                // send json response
                res.send(jsonResponse);
              }
            });

          // release the connection
          connection.release();
          // connection released to the pool
          console.log("Connection released!");
        } else {
          console.error('error connecting: ' + err.stack);
          res.send(err.stack);
        }
    });
  }
};
