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

// GET similar tags
router.get('/:tag', function(req, res) {
  // send a resource
  tag.getTagsLike(req.params).then(function(results) {
    res.json(results);
  });
});

module.exports = router;
