var express = require('express');
var router = express.Router();
var strava = require('strava-v3');

/* GET home page. */
router.get('/', function(req, res, next) {
  strava.athlete.listActivities({'access_token':'58017a86f3884b77737cb548f06d0247cddb4dc0'},
    function(err,payload,limits) {
        if(!err) { res.jsonp(payload); }
        else { console.log(err); }
    });
});

module.exports = router;
