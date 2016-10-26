/*******************************************************************************
video

Database operations regarding the Video table

Endpoint | Request type | Method

/video | GET | getNoVideos()
/video | POST | insertVideo()
/video/enabled | GET | getNoEnabledVideos()
/video/title/:title | GET | getTitleVideos(':title')
/video/tag | GET | getVideosAndTagsDesc()
/video/tag/:tag | GET | getVideosWithTagsLike(':tag')
/video/tag/date/:date | GET | getVideosAndTagsAfter(':date') ||
                              getVideosAndTagsDesc()
/video/tag | POST | getVideosAndTagsLimitAfter({date: "YYYY-MM-DDThh:mm:ss", limit: ":number"}) ||
                    getVideosAndTagsLimitDesc({limit: ":number"}) ||
                    getVideosAndTagsAfter({date: "YYYY-MM-DDThh:mm:ss"}) ||
                    getVideosAndTagsDesc()
/*******************************************************************************/
var connection = require('../middlewares/connection');
var utils = require('../middlewares/utils');

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
  getTitleVideos: function (title) {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
          if (!err) {
            var db = connection.config.database;
            var queryTitleVideos = 'CALL ' + db + '.sp_select_videos_title(?);';

            options.sql = queryTitleVideos;
            options.values = title;

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

  // GET a list with annotated videos and their tags, latest annotated first
  getVideosAndTagsDesc: function () {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
        if (!err) {
          var db = connection.config.database;
          var queryAddVideo = 'CALL ' + db + '.sp_get_videos_and_tags_DESC()';

          options.sql = queryAddVideo;

          connection.query(options, function(err, rows, fields) {
              if (!err) {
                resolve(utils.writeResponse(rows[0]));
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


  // GET videos and their tags with the most recently annotated one first
  // the tags contain a specified text in them
  getVideosWithTagsLike: function (tag) {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
          if (!err) {
            var db = connection.config.database;
            var queryAddVideo = 'CALL ' + db + '.sp_get_videos_LIKE_tags_DESC(?)';

            options.sql = queryAddVideo;
            options.values = tag;

            connection.query(options, function(err, rows, fields) {
                if (!err) {
                  resolve(utils.writeResponse(rows[0]));
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

  // GET a list with annotated videos and their tags, latest annotated first
  // if a date in the correct format is supplied, then the list contains videos
  // AFTER a certain date. Date should be in the following (ISO_8601) format:
  // YYYY-MM-DDThh:mm:ss
  getVideosAndTagsAfter: function (datetime) {
    if (utils.checkISO_8601_date(datetime)) {
      return new Promise(function(resolve, reject) {
        //if a valid ISO 8601 is supplied
          connection.acquirePool(function(err, connection) {
            if (!err) {
              var db = connection.config.database;
              var queryAddVideo = 'CALL ' + db + '.sp_get_videos_and_tags_AFTER(?)';

              options.sql = queryAddVideo;
              options.values = datetime;

              connection.query(options, function(err, rows, fields) {
                  if (!err) {
                    resolve(utils.writeResponse(rows[0]));
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
    } else {
      return this.getVideosAndTagsDesc();
    }
  },

  // GET a list with annotated videos and their tags, latest annotated first
  // retrieve only a specified maximum number of tags
  getVideosAndTagsLimitDesc: function (limit) {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
        if (!err) {
          var db = connection.config.database;
          var queryAddVideo = 'CALL ' + db + '.sp_get_videos_and_tags_limit_DESC(?)';

          options.sql = queryAddVideo;
          options.values = limit;

          connection.query(options, function(err, rows, fields) {
              if (!err) {
                resolve(utils.writeResponse(rows[0]));
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

  // GET a list with annotated videos and their tags, latest annotated first
  // retrieve only a specified maximum number of tags and if a date in the
  // correct format is supplied, then the list contains videos with tags annotated
  // AFTER a certain date. Date should be in the following (ISO_8601) format:
  // YYYY-MM-DDThh:mm:ss
  getVideosAndTagsLimitAfter: function (params) {
    if (utils.checkISO_8601_date(params.date)) {
      return new Promise(function(resolve, reject) {
        connection.acquirePool(function(err, connection) {
          if (!err) {
            var db = connection.config.database;
            var queryAddVideo = 'CALL ' + db + '.sp_get_videos_and_tags_limit_AFTER(?, ?)';

            options.sql = queryAddVideo;
            options.values = [params.date, params.limit];

            connection.query(options, function(err, rows, fields) {
                if (!err) {
                  resolve(utils.writeResponse(rows[0]));
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
    } else {
      return this.getVideosAndTagsLimitDesc(params.limit);
    }
  },

  // GET videos and their tags with the most recently annotated one first
  // the tags contain a specified text in them and if a date in the
  // correct format is supplied, then the list contains videos with tags annotated
  // AFTER a certain date. Date should be in the following (ISO_8601) format:
  // YYYY-MM-DDThh:mm:ss
  getVideosWithTagsLikeAfter: function (params) {
    if (utils.checkISO_8601_date(params.date)) {
      return new Promise(function(resolve, reject) {
        connection.acquirePool(function(err, connection) {
            if (!err) {
              var db = connection.config.database;
              var queryAddVideo = 'CALL ' + db + '.sp_get_videos_LIKE_tags_AFTER(?, ?)';

              options.sql = queryAddVideo;
              options.values = [params.tag, params.date];

              connection.query(options, function(err, rows, fields) {
                  if (!err) {
                    resolve(utils.writeResponse(rows[0]));
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
      } else {
        return getVideosWithTagsLike(params.tag);
      }
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
