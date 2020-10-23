var request = require('request');
var mysql = require('mysql');
var alexa = require("alexa-app");
var alexaApp = new alexa.app("left brain");

alexaApp.intent("item", {
    "slots": { "item": "AMAZON.EVENTTYPE" },
    "utterances": ["your next thing to do is {-|item}"]
  },
  function(request, response) {
    var item = request.slot("item");
    response.say("next you need to do " + item);
  }
);

module.exports.set = function(app){
    
    app.post('/left_brain', function(req, res){
        console.log(req.body);
    });

    app.get('/left_brain_get', function(req, res){
        var strCommand = 'SELECT * FROM todoList;';
        pool.query(strCommand, function(error, results, field){
            if(error) throw error;
            res.json(results);
        });
    });

    app.get('/left_brain_add', function(req, res){
        var newItem = req.query.addItem;
        var strCommand = 'INSERT INTO todoList (item)  VALUES ("'+ newItem + '");';
        pool.query(strCommand, function(error, results, field){
            if(error) throw error;
            res.json(results);
        });
    });
    
    app.get('/left_brain_pop', function(req, res){
        var strCommand = 'DELETE FROM todoList WHERE item = (SELECT item FROM todoList ORDER BY item limit 1)';
        pool.query(strCommand, function(error, results, field){
            if(error) throw error;
            res.json(results);
        });
    });

}