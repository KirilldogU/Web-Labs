module.exports.set = function(app){
    app.get('/cookie_content',[cookieContentVarsChecks], function(req, res){
      if((req.session.views <= 5) || (typeof(req.session.username) != 'undefined')){
        res.render('cookie_content_premium', dataHandlebar);
      }
      res.render('cookie_content_free');
    });
    dataHandlebar = {};
    function cookieContentVarsChecks(req,res,next){
        if( typeof(req.session.views)=='undefined' ) {            // if the cookie has not been set
          req.session.views = 1;                                //   set it to 1;
        } else {                                                  // otherwise, 
          req.session.views++;                                  //   increment its value
        }
        req.session.username = req.query.username;
        dataHandlebar = {
          "viewsNum" : req.session.views,
          "username" : req.session.username
        }
        next();
    }
    app.get('/login', function(req, res){
        res.render('login')
    });
    app.get('/reset', function (req, res, next) {
      req.session = null;                                       // programmatically deletes the cookie
      res.render('reset');
    });
}