/*******************************************************************************
dictionary

Database operations regarding the Dictionary table

Endpoint | Request type | Method

/dict/:term | GET | getDictEntry
/dict | POST |  addDictEntry
*******************************************************************************/
var express = require('express');
var router = express.Router();
var dictionary = require('../models/dictionary');
var utils = require('../middlewares/utils');

// GET dictionary entry term
router.get('/term/:term', function(req, res) {
  // send a resource
  dictionary.getDictionaryTerm(req.params.term).then(function(result) {
    res.json(result);
  });
});

// POST request to insert a dictionary entry
router.post('/', function(req, res) {
  // send a resource
  dictionary.addDictionaryEntry(req.body.dictEntry).then(function(result) {
    res.json(result);
  });
});

module.exports = router;
