/*******************************************************************************
dictionary

Database operations regarding the Dictionary table

Endpoint | Request type | Method

/dict/:term | GET | getDictEntry
/dict | POST |  addDictEntry
/*******************************************************************************/
var connection = require('../middlewares/connection');

// query options
var options = {
  sql: '',
  timeout: 30000, // 30s
  values: []
};

module.exports = {

  // GET dictionary entry
  getDictEntry: function (params) {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
          if (!err) {
            var db = connection.config.database;
            var queryDictTerm = 'SELECT ' + db + '.sp_get_dict_term(?);';

            options.sql = queryDictTerm;
            options.values = params.term;

            connection.query(options, function(err, rows, fields) {
                if (!err) {
                  // result(s) in the form
                  // {Dictionary: 'valueDictionary', normalizedTag: 'valueNormalizedTag'}
                  // var dictEntry = rows[0];
                  // get result and resolve promise
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

  // POST request: insert new dictionary term
  addDictEntry: function (dictEntryData) {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
          if (!err) {
            var db = connection.config.database;
            var queryAddDictEntry = 'CALL ' + db + '.sp_insert_dict(?, ?)';

            options.sql = queryAddDictEntry;

            var dictEntry = JSON.parse(dictEntryData);
            options.values = [dictEntry.normalizedTag, dictEntry.dictionary];

            connection.query(options, function(err, rows, fields) {
                if (!err) {
                  // get result and resolve promise
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
