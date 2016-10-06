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

// GET dictionary entry term
router.get('/:term', function(req, res) {
  // send a resource
  dictionary.getDictTerm(req.params, res);
});

// POST request to insert a dictionary entry
router.post('/', function(req, res) {
  // send a resource
  dictionary.addDictEntry(req.body.dictEntry, res);
});

module.exports = router;
