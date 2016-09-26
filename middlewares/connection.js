var mysql = require('mysql');
var credentials = require('../helpers/local_mysql_credentials');

var connectionInfo = {
  host: credentials.HOST,
  user: credentials.USERNAME,
  password: credentials.PASSWORD,
  database: credentials.DATABASE
};

module.exports = {
  // one connection per request
  init_connection: function () {
    return mysql.createConnection(connectionInfo);
  },

  acquire_connection: function(connection, callback) {
    // get connection
    connection.connect(function(err){
      // use the connection
      callback(err);
    });
  },

  // pool connections to be able to share a single connection or to be able to
  // have and manage multiple connections
  init_pool: function(poolLimit) {
    // add maximum number of connections in the pool
    connectionInfo.connectionLimit = poolLimit;
    return mysql.createPool(connectionInfo);
  },

  acquire_pool: function(pool, callback) {
      // get connection
      pool.getConnection(function(err, connection) {
        // use the connection
        callback(err, connection);
    });
  }
}
