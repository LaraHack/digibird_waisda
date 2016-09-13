/*****************************************************
index

GET home page
*****************************************************/
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var currentDate = new Date();
    var formattedDate = currentDate.getDate() + "-" +
                        (currentDate.getMonth()+1) + "-" +
                        currentDate.getFullYear();
    res.render('home', {
      date: formattedDate
    });

});

module.exports = router;
