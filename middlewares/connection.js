var mysql = require('mysql');
var credentials = require('../helpers/local_mysql_credentials');

var connectionInfo = {
  host: credentials.HOST,
  user: credentials.USERNAME,
  password: credentials.PASSWORD,
  database: credentials.DATABASE
};

module.exports = {
  mysql_connection: function () {

    var connection = mysql.createConnection(connectionInfo);

    connection.connect(function(err){
      if (!err) {
        console.log('connected as id ' + connection.threadId);
      } else {
        console.error('error connecting: ' + err.stack);
        return;
      }
    });

    connection.end(function(err){
      // Do something after the connection is gracefully terminated.
      console.log("Connection terminated!");
    });
  },

  // pool connections to be able to share a single connection or to be able to
  // have and manage multiple connections
  mysql_pool: function () {
    // add maximum number of connections in the pool
    connectionInfo.connectionLimit = 10;
    var pool = mysql.createPool(connectionInfo);

    pool.getConnection(function(err, connection) {
      // connected! (unless `err` is set)

      if (!err) {
        console.log('connected as id ' + connection.threadId);
        // use the connection

        // release it
        connection.release();
          // connection released ot the pool
          console.log("Connection released!");
        } else {
          console.error('error connecting: ' + err.stack);
          return;
        }
    });
  }
}
