/*/*****************************************************************************
video

Database operations regarding the Video table

Endpoint | Request type | Method

/video | GET | getNoVideos
/video?enabled=1 | GET | getNoEnabledVideos
/video | POST | insertVideo
/video?id='xxx' | GET | getVideo('xxx')
/dict | POST |  insertDictEntry
/synonym | POST | insertSynonym
/*******************************************************************************/
var connection = require('../middlewares/connection');

module.exports = {
  getNoVideos: function (res) {
    connection.acquirePool(function(err, connection) {
        if (!err) {
          var threadId = connection.threadId;
          var db = connection.config.database;

          var queryNoVideos = 'SELECT ' + db + '.sf_no_videos();';

          var options = {
            sql: queryNoVideos,
            timeout: 30000, // 30s
          };

          connection.query(options, function(err, rows, fields) {
              if (!err) {
                // get name of returned variable that contains the result
                var nameVarNoVideos = fields[0].name;
                var noVideos = rows[0][nameVarNoVideos];

                var jsonResponse = JSON.stringify({'noVideos': noVideos});

                res.send(jsonResponse);
              }
            });

          // release it
          connection.release();
          // connection released to the pool
          console.log("Connection released!");
        } else {
          console.error('error connecting: ' + err.stack);
          //return err.stack;
          res.send(err.stack);
        }
    });
    }
};
