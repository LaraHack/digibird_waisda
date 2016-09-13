/*****************************************************
index

GET home page
*****************************************************/
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  // run every minute
  setInterval(function() {
    var currentTime = new Date();
    var formattedTime = currentTime.getHours() + ":" +
                        currentTime.getMinutes();
    res.render('home', {
      time: formattedTime
    });
      // 1 minute delay
  }, 600000);

});

module.exports = router;
