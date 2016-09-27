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

// connection.query('CALL ' + credentials.DATABASE + '.sp_select_video ();',
//   function(err, rows, fields) {
//     if (!err) {
//       console.log('Data received from Db:\n');
//       console.log("rows\n", rows[0]);
//       for (var i = 0; i < rows[0].length; i++) {
//         console.log("\nrecord ", i+1);
//         console.log("title:", rows[0][i].title);
//         console.log("image:", rows[0][i].imageUrl);
//         console.log("video:", rows[0][i].sourceUrl);
//         console.log("__________");
//       };

module.exports = {
  getNoVideos: function (res) {
    connection.acquirePool(function(err, connection) {
        if (!err) {
          var threadId = connection.threadId;
          var db = connection.config.database;

          var queryNoVideos = 'SELECT COUNT(*) AS no_videos from ' + db + '.Video;'
          connection.query(queryNoVideos, function(err, rows, fields) {
              if (!err) {
                // get name of returned variable that contains the result
                var nameVarNoVideos = fields[0].name;
                console.log(typeof nameVarNoVideos);
                console.log(nameVarNoVideos);
                var noVideos = rows[0][nameVarNoVideos];

                var jsonResponse = {
                  'db': db,
                  'threadId': threadId
                };
                jsonResponse[nameVarNoVideos] = noVideos;

                console.log(jsonResponse);

                // res.send("db: " + db + " | threadId: " + threadId + " | " +
                // nameVarNoVideos + " = " + noVideos);
                res.send(JSON.stringify(jsonResponse));
              }
            });

          // release it
          connection.release();
          // connection released to the pool
          console.log("Connection released!");
          // res.send("db:" + db + "| threadId:" + threadId + "|" + noVideos);
        } else {
          console.error('error connecting: ' + err.stack);
          //return err.stack;
          res.send(err.stack);
        }
    });
    }
};
