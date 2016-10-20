/*******************************************************************************
tag

Retrieve information about tags

Endpoint | Request type | Method

/tag | GET | getNoTags
/tag/unique | GET | getUniqueNoTags
*******************************************************************************/
var express = require('express');
var router = express.Router();

var tag = require('../models/tag');

// GET total number of tags
router.get('/', function(req, res) {
  tag.getNoTags().then(function(noTags) {
    res.json({'noTags': noTags});
  });
});

// GET number of unique tags
router.get('/unique', function(req, res) {
  tag.getUniqueNoTags().then(function(noUniqueTags) {
    res.json({'noUniqueTags': noUniqueTags});
  });
});

// GET videos with a certain tag
router.get('/:tag', function(req, res) {
  tag.getLikeTags(req.params).then(function(videos) {
    res.json(videos);
  });
});

module.exports = router;
