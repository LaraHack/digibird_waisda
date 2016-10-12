/*******************************************************************************
statistics

Retrieve information about videos, tags and players

Endpoint | Request type | Method

/statistics | GET | getStatistics
*******************************************************************************/
var express = require('express');
var router = express.Router();

var statistics = require('../models/statistics');

// GET statistics: #players, #tags, #videos, #games
router.get('/', function(req, res) {
  statistics.getStatistics().then(function(result) {
    // parse the result and put it in JSON form
    var results = {};
    results["noPlayers"] = result[0];
    results["noTags"] = result[1];
    results["noVideos"] = result[2];
    results["noGames"] = result[3];

    res.json(results);
  });
});

module.exports = router;
