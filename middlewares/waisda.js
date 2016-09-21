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
    // var connection = mysql.createConnection({
    //   host: credentials.HOST,
    //   user: credentials.USERNAME,
    //   password: credentials.PASSWORD,
    //   database: credentials.DATABASE
    // });

    var connection = mysql.createConnection(connectionInfo);

    console.log("username:", credentials.USERNAME);
    //connection.connect();

    connection.connect(function(err){
      if (!err) {
        console.log('connected as id ' + connection.threadId);
      } else {
        console.error('error connecting: ' + err.stack);
        return;
      }
    });

    // connection.query('SELECT * from ' + credentials.DATABASE + '.Video;',
    //   function(err, rows, fields) {
    //   if (!err) {
    //     console.log("The solution is: ", rows);
    //     console.log("The fields are: ", fields);
    //   } else {
    //     console.log("Error while performing Query.");
    //     return;
    //   }
    // });

    // var params = "'test5','000000', NULL, 0, 'JW', NULL, NULL, NULL, NULL";
    // connection.query('CALL ' + credentials.DATABASE + '.sp_insert_video (' + params + ');',
    //   function(err, rows, fields) {
    //     if (!err) {
    //       console.log('Data received from Db:\n');
    //       console.log(rows);
    //       // OkPacket {
    //         // fieldCount: 0,
    //         // affectedRows: 1,
    //         // insertId: 0,
    //         // serverStatus: 2,
    //         // warningCount: 0,
    //         // message: '',
    //         // protocol41: true,
    //         // changedRows: 0 }
    //         console.log(fields); //undefined
    //     } else {
    //       console.log("Error while performing Query.");
    //       return;
    //     }
    // });

    connection.query('CALL ' + credentials.DATABASE + '.sp_select_video ();',
      function(err, rows, fields) {
        if (!err) {
          console.log('Data received from Db:\n');
          console.log("rows\n", rows[0]);
          for (var i = 0; i < rows[0].length; i++) {
            console.log("\nrecord ", i+1);
            console.log("title:", rows[0][i].title);
            console.log("image:", rows[0][i].imageUrl);
            console.log("video:", rows[0][i].sourceUrl);
            console.log("__________");
          };
          //console.log("\nfields\n", fields);
        } else {
          console.log("Error while performing Query.");
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
    var pool = mysql.createPool({
      host: credentials.HOST,
      user: credentials.USERNAME,
      password: credentials.PASSWORD,
      database: credentials.DATABASE
    });

    pool.getConnection(function(err, connection) {
      // connected! (unless `err` is set)

      if (!err) {
        console.log('connected as id ' + connection.threadId);
        // use the connection
        connection.query('CALL ' + credentials.DATABASE + '.sp_select_video ();',
          function(err, rows, fields) {
            if (!err) {
              console.log('Data received from Db:\n');
              console.log("rows\n", rows[0]);
              for (var i = 0; i < rows[0].length; i++) {
                console.log("\nrecord ", i+1);
                console.log("title:", rows[0][i].title);
                console.log("image:", rows[0][i].imageUrl);
                console.log("video:", rows[0][i].sourceUrl);
                console.log("__________");
              };
              //console.log("\nfields\n", fields);
            } else {
              console.log("Error while performing Query.");
              return;
            }
        });

        // release it
        connection.release();
          // connection released ot the pool
        } else {
          console.error('error connecting: ' + err.stack);
          return;
        }
    });
  }
}
