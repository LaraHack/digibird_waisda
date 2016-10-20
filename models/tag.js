/*******************************************************************************
tag

Database operations regarding the Tags table

Endpoint | Request type | Method

/tag | GET | getNoTags
/tag/unique | GET | getUniqueNoTags
/*******************************************************************************/
var connection = require('../middlewares/connection');

// query options
var options = {
  sql: '',
  timeout: 30000, // 30s
  values: []
};

module.exports = {
  // GET total number of tags
  getNoTags: function () {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
          if (!err) {
            var db = connection.config.database;
            var queryNoTags = 'SELECT ' + db + '.sf_no_tags();';

            options.sql = queryNoTags;

            connection.query(options, function(err, rows, fields) {
                if (!err) {
                  // get name of returned variable that contains the result
                  var nameVarNoTags = fields[0].name;
                  // get result
                  var noTags = rows[0][nameVarNoTags];
                  // resolve promise and send response
                  resolve(noTags);
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
  // GET total number of tags
  getUniqueNoTags: function () {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
          if (!err) {
            var db = connection.config.database;
            var queryNoTags = 'SELECT ' + db + '.sf_unique_no_tags();';

            options.sql = queryNoTags;

            connection.query(options, function(err, rows, fields) {
                if (!err) {
                  // get name of returned variable that contains the result
                  var nameVarNoTags = fields[0].name;
                  // get result
                  var noUniqueTags = rows[0][nameVarNoTags];
                  // resolve promise and send response
                  resolve(noUniqueTags);
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
  // GET total number of tags
  getLikeTags: function (params) {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
          if (!err) {
            var db = connection.config.database;
            var queryVideos = 'CALL ' + db + '.sp_get_LIKE_tags(?)';

            options.sql = queryVideos;
            options.values = params.tag;

            connection.query(options, function(err, rows, fields) {
                if (!err) {
                  // resolve promise and send response
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
};
