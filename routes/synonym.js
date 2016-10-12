/*******************************************************************************
synonym

Database operations regarding the MatchingTag table that contains synonyms

Endpoint | Request type | Method

/synonym/:synonym | GET | getSynonymEntry
/synonym | POST | addSynonym
*******************************************************************************/
var express = require('express');
var router = express.Router();

var synonym = require('../models/synonym');

// GET synonyms
router.get('/:synonym', function(req, res) {
  // send a resource
  synonym.getSynonym(req.params).then(function(result) {
    res.json({'result': result});
  });
});

// POST request to insert a synonym entry
router.post('/', function(req, res) {
  // send a resource
  synonym.addSynonymEntry(req.body.synonymEntry).then(function(result) {
    res.json({'result': result});
  });
});

module.exports = router;
