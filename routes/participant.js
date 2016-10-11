/*******************************************************************************
video

Retrieve information about videos and do various operations on the Video table

Endpoint | Request type | Method

/video | GET | getNoVideos
/video?enabled=true | GET | getNoEnabledVideos
/video | POST | insertVideo
/video/title/:title | GET | getVideo(':title')
*******************************************************************************/
var express = require('express');
var router = express.Router();

var participant = require('../models/participant');

// GET total number of players
router.get('/', function(req, res) {
  // send a resource
  participant.getNoParticipants(res);
});

module.exports = router;
