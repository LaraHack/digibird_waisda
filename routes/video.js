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

var video = require('../models/video');

// GET total number of videos
router.get('/', function(req, res) {
  // send a resource
  video.getNoVideos(res);
});

// POST request to insert a video
router.post('/', function(req, res) {
  // send a resource
  video.addVideo(req.body.video, res);
});

// GET total number of enabled videos
router.get('/enabled', function(req, res) {
  // send a resource
  video.getNoEnabledVideos(res);
});

// GET videos with similar title
router.get('/title/:title', function(req, res) {
  // send a resource
  video.getTitleVideos(req.params, res);
});

module.exports = router;
