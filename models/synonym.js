/*******************************************************************************
synonym

Database operations regarding the MatchingTag table that contains synonyms

Endpoint | Request type | Method

/synonym/:synonym | GET | getSynonymEntry
/synonym | POST | addSynonym
/*******************************************************************************/
var connection = require('../middlewares/connection');

// query options
var options = {
  sql: '',
  timeout: 30000, // 30s
  values: []
};

module.exports = {

  // GET synonym entry
  getSynonym: function (params, res) {
    connection.acquirePool(function(err, connection) {
        if (!err) {
          var db = connection.config.database;
          var querySynonym = 'SELECT ' + db + '.sp_get_synonym(?);';

          options.sql = querySynonym;
          options.values = params.synonym;

          connection.query(options, function(err, rows, fields) {
              if (!err) {
                // result(s) in the form
                // {lo: 'valueLo', hi: 'valueHi'}
                var synonymEntry = rows[0];
                // stringify result
                var jsonResponse = JSON.stringify(synonymEntry);

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
  },

  // POST request: insert new synonym terms
  addSynonymEntry: function (synonymEntryData, res) {
    connection.acquirePool(function(err, connection) {
        if (!err) {
          var db = connection.config.database;
          var queryAddSynonymEntry = 'CALL ' + db + '.sp_insert_synonym(?, ?)';

          options.sql = queryAddSynonymEntry;

          var synonymEntry = JSON.parse(synonymEntryData);
          options.values = [synonymEntry.lo, synonymEntry.hi];

          connection.query(options, function(err, rows, fields) {
              if (!err) {
                // get result and stringify it in JSON format
                var jsonResponse = JSON.stringify(rows[0]);

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
