/*****************************************************
index

GET home page
*****************************************************/
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var currentTime = new Date();
  var formattedTime = currentTime.getHours() + ":" +
                      currentTime.getMinutes();
  res.render('home', {
    time: formattedTime
  });
});

module.exports = router;
