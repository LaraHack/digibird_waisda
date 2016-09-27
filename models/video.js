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
          console.log('connected as id ' + threadId);
          //connection.query();

          // release it
          connection.release();
          // connection released ot the pool
          console.log("Connection released!");
          //return threadId;
          res.send("threadId:" + threadId);
        } else {
          console.error('error connecting: ' + err.stack);
          //return err.stack;
          res.send(err.stack);
        }
    });
    }
};
