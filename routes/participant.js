/*******************************************************************************
participant

Retrieve information about players

Endpoint | Request type | Method

/player| GET | getNoPlayers
*******************************************************************************/
var express = require('express');
var router = express.Router();

var participant = require('../models/participant');

// GET total number of players
router.get('/', function(req, res) {
  // send a resource
  participant.getNoPlayers().then(function(noPlayers) {
    res.json({'noPlayers': noPlayers});
  });
});

module.exports = router;
