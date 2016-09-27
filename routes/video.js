/*******************************************************************************
video

Retrieve information about videos and do various operations on the Video table

Endpoint | Request type | Method

/video | GET | getNoVideos
/video?enabled=true | GET | getNoEnabledVideos
/video | POST | insertVideo
/video?id='xxx' | GET | getVideo('xxx')
*******************************************************************************/
var express = require('express');
var router = express.Router();

var video = require('../models/video');

// GET total number of videos
router.get('/', function(req, res) {
  // send a resource
  video.getNoVideos(res);
});

module.exports = router;
