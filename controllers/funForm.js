module.exports.set = function(app){
    app.get('/funform', function(req, res){
        res.render('funGetForms');
    });
    app.get('/funformsmadness', function(req, res){
        dict= {
            type : req.query.type,
            word1 : req.query.word1,
            word2 : req.query.word2,
            word3 : req.query.word3,
            word4 : req.query.word4,
            word5 : req.query.word5
        }
        res.render('funMadness', dict);
    });
}