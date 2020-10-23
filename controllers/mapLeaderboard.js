module.exports.set = function(app){
    leaderboard = [0,0,0,0,0,0,0,0,0,0]
    
    app.get('/map_leaderboard', function(req, res){
        var roundPoints = req.query.roundPoints;
        leaderboard.push(roundPoints);
        leaderboard.sort(function(a, b){return b - a});
        if(leaderboard.length > 10){
            leaderboard.pop()
        }
        res.json(leaderboard)
    });
}