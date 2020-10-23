var request = require('request');

module.exports.set = function(app){
    function setParams(req,res, next){
    var latitude = req.query.lat;
    var longitude = req.query.long;
    console.log('https://api.weather.gov/points/' + latitude + ',' + longitude)
    var params = {
        url : 'https://api.weather.gov/points/' + latitude + ',' + longitude,
        headers : {
         'User-Agent': 'request'
        }
    };
    function callback(e, r, body) {
        var obj = JSON.parse(body);
        if(obj.status == 404){
            res.json('YOUR POINTS ARE UNFORTUNATE! TRY AGAIN');
        }else{
            console.log( obj);
            res.locals.forecasturl = obj.properties.forecast;
            console.log(obj.properties.forecast);
            next();
        }
    }
    request.get(params, callback);
    }
    function getForecast(req,res, next){
        var params = {
            url : res.locals.forecasturl,
            headers : {
             'User-Agent': 'request'
            }
        };
        function callback(e, r, body) {
            var obj = JSON.parse(body);
            console.log( obj);
            var todayForecast = obj.properties.periods[0];
            res.locals.todayForecast = todayForecast;
            res.locals.tempToday = todayForecast.temperature;
            res.locals.detailedForecast = todayForecast.detailedForecast;
            console.log("TEMP TODAY " + res.locals.tempToday);
            console.log("DETAAAAILED " + res.locals.detailedForecast);
            next();
        }
        request.get(params, callback);
        //next();
    }
    app.get('/weatherform', function(req, res){
        res.render('form_01');
    });
    app.get('/getweather', [setParams, getForecast], function(req, res){
        console.log('get function')
        var weather_dict = {
            point : [req.query.lat, req.query.long],
            day : "TODAY!",
            temp : res.locals.tempToday,
            detailedForecast : res.locals.detailedForecast
        }    
        if (req.query.format == "JSON"){
            res.json(res.locals.todayForecast);
        }
        res.render('index', weather_dict);
    });
    
}