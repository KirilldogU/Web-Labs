module.exports.set = function(app){
    app.get('/', function(req, res){
        res.render('homepage');
    });
}