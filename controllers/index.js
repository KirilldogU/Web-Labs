var weather = require('./weather.js');
var mapGame = require('./mapgame.js');
var homePage = require('./homepage.js');
var mapLeaderboard = require('./mapLeaderboard.js');
var votingForm = require('./votingForm.js');
var funForm = require('./funForm.js');
var cookie = require('./cookie.js');
var oauth = require('./oauth.js');
var thanksgiving = require('./thanksgivingLab.js')
var sql_houses = require('./sql_houses.js')
var left_brain = require('./left_brain.js')
var serp = require('./serp.js')
module.exports.set = function(app){
    weather.set(app);
    mapGame.set(app);
    homePage.set(app);
    mapLeaderboard.set(app);
    votingForm.set(app);
    funForm.set(app);
    cookie.set(app);
    oauth.set(app);
    thanksgiving.set(app);
    sql_houses.set(app);
    left_brain.set(app);
    serp.set(app);
    
    app.get('/:page', function(req, res){
        res.render('homepage');
    });
}