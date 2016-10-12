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
  // GET total number of videos
  getNoVideos: function () {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
        if (!err) {
          var db = connection.config.database;
          var queryNoVideos = 'SELECT ' + db + '.sf_no_videos();';

          options.sql = queryNoVideos;

          connection.query(options, function(err, rows, fields) {
              if (!err) {
                // get name of returned variable that contains the result
                var nameVarNoVideos = fields[0].name;
                // get result
                var noVideos = rows[0][nameVarNoVideos];
                // resolve promise and send response
                resolve(noVideos);
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
  },

  // GET number of videos that are enabled
  getNoEnabledVideos: function () {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
          if (!err) {
            var db = connection.config.database;
            var queryNoEnabledVideos = 'SELECT ' + db + '.sf_no_enabled_videos();';

            options.sql = queryNoEnabledVideos;

            connection.query(options, function(err, rows, fields) {
                if (!err) {
                  // get name of returned variable that contains the result
                  var nameVarNoVideos = fields[0].name;
                  // get result
                  var noVideos = rows[0][nameVarNoVideos];
                  // resolve promise and send response
                  resolve(noVideos);
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
  },

  // GET videos with a title that contains a certain text
  getTitleVideos: function (params) {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
          if (!err) {
            var db = connection.config.database;
            var queryTitleVideos = 'CALL ' + db + '.sp_select_videos_title(?);';

            options.sql = queryTitleVideos;
            options.values = params.title;

            console.log();

            connection.query(options, function(err, rows, fields) {
                if (!err) {
                  // get result and resolve the promise
                  resolve(rows[0]);
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
  },

  // POST request: insert new video
  addVideo: function (videoData) {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
          if (!err) {
            var db = connection.config.database;
            var queryAddVideo = 'CALL ' + db + '.sp_insert_video(?, ?, ?, ?, ?, ?, ?, ?, ?)';

            options.sql = queryAddVideo;

            var video = JSON.parse(videoData);
            options.values = [video.title, video.duration, video.imageUrl,
              video.enabled, video.playerType, video.sourceUrl, video.fragmentID,
              video.sectionNid, video.startTime];

            connection.query(options, function(err, rows, fields) {
                if (!err) {
                  // get result
                  resolve(rows[0]);
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
