var mysql = require('mysql');
var credentials = require('../helpers/mysql_credentials');

module.exports = {
  mysql_connect: function () {
    var connection = mysql.createConnection({
      host: credentials.HOST,
      user: credentials.USER,
      password: credentials.PASSWORD,
      database: credentials.DATABASE
    });

    //connection.connect();

    connection.connect(function(err){
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }

      console.log('connected as id ' + connection.threadId);
    });
    // connection.query("SELECT * from Video", function(err, rows, fields) {
    //   if (!err) {
    //     console.log("The solution is: ", rows);
    //   } else {
    //     console.log("Error while performing Query.");
    //   });
    // connection.query('CALL insert_video(parms)',function(err,rows){
    //   if(err) throw err;
    //
    //   console.log('Data received from Db:\n');
    //   console.log(rows[0]);
    // });

    connection.end(function(err){
    // Do something after the connection is gracefully terminated.
    console.log("Connection terminated!");
    });
  }
};
