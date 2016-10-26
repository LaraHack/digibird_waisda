/*******************************************************************************
video

Retrieve information about videos and do various operations on the Video table

Endpoint | Request type | Method

/video | GET | getNoVideos()
/video | POST | insertVideo()
/video/enabled | GET | getNoEnabledVideos()
/video/title/:title | GET | getTitleVideos(':title')
/video/tag | GET | getVideosAndTagsDesc()
/video/tag/:tag | GET | getVideosWithTagsLike(':tag')
/video/tag/date/:date | GET | getVideosAndTagsAfter(':date') ||
                              getVideosAndTagsDesc()
/video/tag | POST | getVideosAndTagsLimitAfter({date: "YYYY-MM-DDThh:mm:ss", limit: ":number"}) ||
                    getVideosAndTagsLimitDesc({limit: ":number"}) ||
                    getVideosAndTagsAfter({date: "YYYY-MM-DDThh:mm:ss"}) || 
                    getVideosAndTagsDesc()
*******************************************************************************/
var express = require('express');
var router = express.Router();

var video = require('../models/video');

// GET total number of videos
router.get('/', function(req, res) {
  video.getNoVideos().then(function(noVideos) {
    res.json({'noVideos': noVideos});
  });
});

// POST request to insert a video
router.post('/', function(req, res) {
  // send a resource
  video.addVideo(req.body.video).then(function(result) {
    res.json({"inserted:":result});
  });
});

// GET total number of enabled videos
router.get('/enabled', function(req, res) {
  // send a resource
  video.getNoEnabledVideos().then(function(noEnabledVideos) {
    res.json({'noEnabledVideos': noEnabledVideos});
  });
});

// GET videos with similar title
router.get('/title/:title', function(req, res) {
  // send a resource
  video.getTitleVideos(req.params.title).then(function(results) {
    res.json(results);
  });
});

// GET videos with their tags, most recently tagged first
router.get('/tag', function(req, res) {
  // send a resource
  video.getVideosAndTagsDesc().then(function(results) {
    res.json(results);
  });
});

// GET videos with similar tags, most recent videos that were tagged first
router.get('/tag/:tag', function(req, res) {
  // send a resource
  video.getVideosWithTagsLike(req.params.tag).then(function(results) {
    res.json(results);
  });
});

// GET videos with their tags, most recently tagged first
router.get('/tag/date/:date', function(req, res) {
  video.getVideosAndTagsAfter(req.params.date).then(function(results) {
    res.json(results);
  });
});

// GET videos with their tags, most recently tagged first
router.post('/tag', function(req, res) {
  var params = req.body;

  if (params.date && params.limit) {
    video.getVideosAndTagsLimitAfter(params).then(function(results) {
      res.json(results);
    });
  } else {
    if (params.limit) {
      video.getVideosAndTagsLimitDesc(params.limit).then(function(results) {
        res.json(results);
      });
    } else {
      if (params.date) {
        video.getVideosAndTagsAfter(params.date).then(function(results) {
          res.json(results);
        });
      } else {
        video.getVideosAndTagsDesc().then(function(results) {
          res.json(results);
        });
      }
    }
  }
});

module.exports = router;
