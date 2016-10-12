/*******************************************************************************
statistics

General statistics regarding the Waisda? game

Endpoint | Request type | Method

/statistics | GET | getStatistics
/*******************************************************************************/
var connection = require('../middlewares/connection');
var tag = require('../models/tag');
var video = require('../models/video');
var game = require('../models/game');
var participant = require('../models/participant');

module.exports = {
  // GET general statistics
  getStatistics: function () {
    var promises = [];

    // get number of players
    promises.push(participant.getNoPlayers());
    // get number of tags
    promises.push(tag.getNoTags());
    // get number of videos
    promises.push(video.getNoVideos());
    // get number of videos with tags -> later!
    // get number of games
    promises.push(game.getNoGames());

    return Promise.all(promises);
  }
};
