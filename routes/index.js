/*******************************************************************************
index

GET home page

Endpoint | Request type | Method

/video | GET | getNoVideos
/video?enabled=true | GET | getNoEnabledVideos
/video | POST | insertVideo
/video?id='xxx' | GET | getVideo('xxx')
/dict | POST |  insertDictEntry
/synonym | POST | insertSynonym
*******************************************************************************/
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var currentDate = new Date();
  var formattedDate = currentDate.getDate() + "-" + (currentDate.getMonth()+1) +
                      "-" + currentDate.getFullYear();
  res.render('home', {
    date: formattedDate
  });
});

module.exports = router;
