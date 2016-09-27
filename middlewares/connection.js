/*******************************************************************************
connection

Creates the connection to the MySQL db either as a simple connection or
in the form of a connection pool
********************************************************************************/
var mysql = require('mysql');
var credentials = require('../helpers/local_mysql_credentials');

var connectionInfo = {
  host: credentials.HOST,
  user: credentials.USERNAME,
  password: credentials.PASSWORD,
  database: credentials.DATABASE
};

var connection = null;

module.exports = {
  // one connection per request -> "expensive operation", pooling preferred
  initConnection: function () {
    connection = mysql.createConnection(connectionInfo);
  },

  acquireConnection: function(callback) {
    // get connection
    connection.connect(function(err){
      // use the connection
      callback(err, connection);
    });
  },

  // pool connections
  // keep a number of conenctions open that can be reused by others
  initPool: function(poolLimit) {
    // add maximum number of connections in the pool
    connectionInfo.connectionLimit = poolLimit;
    //return mysql.createPool(connectionInfo);
    connection = mysql.createPool(connectionInfo);
  },

  acquirePool: function(callback) {
      // get connection
      connection.getConnection(function(err, conn) {
        // use the connection
        callback(err, conn);
    });
  }
};
