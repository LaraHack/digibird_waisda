/*******************************************************************************
dictionary

Database operations regarding the Dictionary table

Endpoint | Request type | Method

/dict/:term | GET | getDictEntry
/dict | POST |  addDictEntry
/*******************************************************************************/
var fs = require('fs');
var path = require('path');
var COMMON_NAMES_NL = path.resolve(__dirname, '..', 'helpers/ioc_tuples.json');
var utils = require('../middlewares/utils');
var connection = require('../middlewares/connection');

// query options
var options = {
  sql: '',
  timeout: 30000, // 30s
  values: []
};

module.exports = {
  // GET dictionary entry
  getDictionaryTerm: function (term) {
    return new Promise(function(resolve, reject) {
      connection.acquirePool(function(err, connection) {
          if (!err) {
            var db = connection.config.database;
            var queryDictTerm = 'CALL ' + db + '.sp_get_dict_term(?);';

            options.sql = queryDictTerm;
            options.values = utils.normalizeEntry(term);

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
  },

  addDictionaryEntries: function () {
    try {
     var contents = fs.readFileSync(COMMON_NAMES_NL, 'utf-8');
     var parsed = JSON.parse(contents);
     for (var i = 0; i < parsed.length; i++) {
       this.addDictionaryEntry({"normalizedTag":`${utils.normalizeEntry(parsed[i].common_name)}`,"dictionary":"common_names_NL"});
     }
   } catch (error) {
     console.error(error);
   }
  },

  // POST request: insert new dictionary term
  addDictionaryEntry: function (dictEntryData) {
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
