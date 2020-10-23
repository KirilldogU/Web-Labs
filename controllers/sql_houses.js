var request = require('request');
var mysql = require('mysql');

module.exports.set = function(app){
    //table = frozenCharTable 
    
    app.get('/sql_houses_helper', function(req, res){
        var voteName = req.query.vote;
        console.log(voteName);
        var strCommand = 'SELECT votes FROM frozenCharTable';
        if(voteName === undefined){
            pool.query(strCommand, function(error, results, field){
                if(error) throw error;
                res.json(results);
            });
        }else{
            strCommand = 'SELECT votes FROM frozenCharTable WHERE name = "' + String(voteName) + '"';
            var resultsVotes  = 0;
            pool.query(strCommand, function(error, results, field){
                if(error) throw error;
                resultsVotes = results[0].votes + 1;
                //res.json(results);
                
                
                strCommand = 'UPDATE frozenCharTable SET votes = ' + resultsVotes + ' WHERE name = "' + String(voteName) + '"';
                pool.query(strCommand, function(error, results, field){
                    if(error) throw error;
                });
                
                strCommand = 'SELECT * FROM frozenCharTable';
                pool.query(strCommand, function(error, results, field){
                    if(error) throw error;
                    console.log(results);
                    res.json(results);
                });   
            });
        }
    });
}