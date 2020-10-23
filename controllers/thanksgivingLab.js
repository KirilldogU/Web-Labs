var request = require('request');
var mysql = require('mysql');

module.exports.set = function(app){
    pool = mysql.createPool({
        connectionLimit : 10,
        user : 'site_2020kusubya',
        password : '3t8FM4tbwVURHAtH2gGFENJN',
        host : 'mysql1.csl.tjhsst.edu',
        port : 3306,
        database : 'site_2020kusubyan'
    });
    
    app.get('/thanksgivinglab', function(req, res){
        var voteName = req.query.vote;

        stringCommand = 'SELECT score FROM COD_gamer WHERE name = "' + String(voteName) + '"';
        resultsScore  = 0;
        pool.query(stringCommand, function(error, results, field){
            if(error) throw error;
            console.log(results);
            resultsScore = results[0].score + 1;
            //res.json(resultsScore);
        
            //increments score
            stringCommand = 'UPDATE COD_gamer SET score = ' + resultsScore + ' WHERE name = "' + String(voteName) + '"';
            pool.query(stringCommand, function(error, results, field){
                if(error) throw error;
                console.log(results);
            });
            
            
            //send final
            stringCommand = 'SELECT * FROM COD_gamer';
            pool.query(stringCommand, function(error, results, field){
                if(error) throw error;
                console.log(results);
                res.json(results);
            });
        });
        
        //
    });
}