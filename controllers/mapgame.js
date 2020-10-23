var request = require('request');
var mysql = require('mysql');

module.exports.set = function(app){
    data = {}
    function middlewareReadFile(req,res,next){
        condimentStateList = chars.split(/[\n-]/)
        console.log(condimentStateList)
        data = {
            "condimentStateList" : condimentStateList,
            'yolo' : 'fire'
        }
        console.log(data);
        next();
    }
    app.get('/map_game', [middlewareReadFile], function(req, res){
        res.render('worldMap', data);
    });
    
    app.get('/map_leaderboard_helper', function(req, res){
        var name = req.query.name;
        var score = req.query.score;
        console.log(name);
        var strCommand = 'SELECT * FROM mapLeaderboard';
        if(name === undefined){
            pool.query(strCommand, function(error, results, field){
                if(error) throw error;
                res.json(results);
            });
        }else{
//            strCommand = 'UPDATE mapLeaderboard SET score = ' + score + ' WHERE name = "' + String(name) + '"';
            strCommand = 'INSERT INTO mapLeaderboard (name, score) VALUES ("' + String(name) +'", ' + score +'); ';
            pool.query(strCommand, function(error, results, field){
                if(error) throw error;
            });
            
            strCommand = 'SELECT * FROM mapLeaderboard';
            pool.query(strCommand, function(error, results, field){
                if(error) throw error;
                console.log(results);
                res.json(results);
            });   
        }
    });
}