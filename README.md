# Waisda? database API

A Node.js application built to access the MySQL database of [Waisda?](http://dl.acm.org/citation.cfm?id=2502221). It can be used to get statistics and perform operations on the database of the game.

More details will be added here. Currently under development!

## Introduction
The Waisda? database API is primarly intended for computers to communicate with other computers. It is used to provide information regarding the data that is used to populate an instance of the [Waisda? video labelling game](https://github.com/beeldengeluid/waisda) database.

## Waisda? instance
The current Waisda? instance is hosted at [Nederlands Beeld en Geluid (Netherlands Sound and Vision Institute)](http://www.beeldengeluid.nl/) and contains selected videos containing birds from the [Natuurbelden collection](http://www.natuurbeelden.nl/). This collection is the biggest video collection of plants, animals and nature sceneries in the Netherlands.

The current url where the Waisda? instance is hosted is:
http://waisda.beeldengeluid.nl

The current base url for the service is: 
http://waisda.beeldengeluid.nl/waisdadb

## Endpoints

The Waisda? database API endpoints follow the general form:

`address_waisda_api/{name_statistic}/{optional parameters}`

The `{name_statistic}` can be: video, tag, game, player, statistics. The `{optional parameters}` give detailed information on the statistic that is chosen. 

Endpoint | Request type | Details
------------ | ------------- | -------------
`/statistics`| GET | General statistics: #players, #tags, #videos, #games
`/video` | GET | Get total number of videos
`/video/enabled` | GET | Get number of videos that are enabled (appear in the game)
`/video/title/{title}` | GET | Get all videos with a title that contains *title*
`/video/tag/title/{text}` | GET | Get all videos with tags that contain *text*
`/video` | POST | Add a video to the game
`/tag` | GET | Get total number of tags added 
`/tag/unique` | GET | Get number of unique tags addded
`/tag/{text}` | GET | Get all videos with tags that contain *text*
`/player` | GET | Get total number of players
`/game` | GET | Get total number of games played

In nearly all cases, an API request returns data as a JSON-formatted document.

## Deployment
This API is meant to give access to the database of an instance of the Waisda? game. 

The credentials to access the database need to be added to the API in a file `/helpers/mysql_cedentials.js` with the following content:

```
HOST = 'localhost';
DATABASE = 'database_name';
USERNAME = 'username';
PASSWORD = 'password';

exports.HOST = HOST;
exports.DATABASE = DATABASE;
exports.PASSWORD = PASSWORD;
exports.USERNAME = USERNAME;
```

All the stored procedures used by this API can be found in the `/helpers/sql` folder. These need to be added to the MySQL database of Waisda? before the API is used.
