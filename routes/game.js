/*******************************************************************************
game

Retrieve information about games

Endpoint | Request type | Method

/game | GET | getNoGames
*******************************************************************************/
var express = require('express');
var router = express.Router();

var game = require('../models/game');

// GET total number of games played
router.get('/', function(req, res) {
  game.getNoGames().then(function(noGames) {
    res.json({'noGames': noGames});
  });
});

module.exports = router;
