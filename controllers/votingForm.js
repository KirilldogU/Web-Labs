module.exports.set = function(app){
    yodaWins = 0;
    floridaManWins = 0;
    nightKingWins = 0;
    thanosWins = 0;
    dataFight = {
        yodaWins : yodaWins,
        floridaManWins : floridaManWins,
        nightKingWins : nightKingWins,
        thanosWins : thanosWins
    }
    
    app.get('/voting_form', function(req, res){
        res.render('voting_form', dataFight);
    });
    
    app.get('/voting_worker', function(req, res){
        var winner = req.query.winner;
        if(winner == "Yoda"){
            yodaWins = yodaWins+1;    
        }
        if(winner == "Florida Man"){
            floridaManWins = floridaManWins+1;    
        }
        if(winner == "Night King"){
            nightKingWins = nightKingWins+1;    
        }
        if(winner == "Thanos"){
            thanosWins = thanosWins+1;    
        }
        dataFight = {
            "yodaWins" : yodaWins,
            "floridaManWins" : floridaManWins,
            "nightKingWins" : nightKingWins,
            "thanosWins" : thanosWins
        }
        res.json(dataFight)
    
    });
}