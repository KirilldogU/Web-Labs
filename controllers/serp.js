var request = require('request');
var fs = require('fs');

module.exports.set = function(app){
    app.get('/serp', function(req, res){
        res.render('serp_form');
    });
//BELOW IS BETA IMPLEMENTATION - custom location and no SQL    

    app.get('/serp_worker', [getSERP], function(req, res){
        res.json(res.locals.serpResult);
    });
    
    function getSERP(req,res, next){
    var query = String(req.query.query);
    var location = String(req.query.citystate)+", United States";
    url = "https://serpapi.com/search?engine=google&location="+ String(location) + "&q="+ String(query)+"&hl=en&gl=us&output=json&api_key=bc42f9b13acaf3299a9e05a272803212c4d7c7a8b786505076d5e4937a190e39";
    console.log('Google Scrape');
    console.log('Query of: ' + query);
    console.log('Location of: '+ location);

    var params = {
        url : url,
        headers : {
         'User-Agent': 'request'
        }
    };
    function callback(e, r, body) {
        var obj = JSON.parse(body);
        if(obj.status == 404){
            res.json('Error on call (!)');
        }else{
            console.log(obj);
            res.locals.serpResult = obj;
            next();
        }
    }
    request.get(params, callback);
    }

//WORK FOR 100 CITY + SQL SAVE BEGINS BELOW

    cityStateList = []
    function readCitiesFile(){
        rawText = cityText.split(/[\n-]/);
        console.log(rawText);
        for (var item of rawText){
            console.log(item);
            //item.replace("\r", ", United States");
            cityStateList.push(item.replace("\r", ", United States"));
        }
        //console.log(condimentStateList)
        return(cityStateList);
    }
    //console.log(readCitiesFile());
    
    app.get('/serp_extended_worker', [get100SERP], function(req, res){
        var query = String(req.query.query);
        var location = String(req.query.citystate)+", United States";

        console.log('EXTENDED OCCURRING:');
        totalResults = res.locals.serpResult;
        for (var result of totalResults){
            serpAds = result.ads;
            for (var ad of serpAds){            //query is constant but location changes
                //location sets
                console.log("POSITION:");
                position = parseInt(ad.position);
                console.log(position)
                console.log("TITLE:");
                title = String(ad.title);
                console.log(title)
                console.log("DESCRIPTION:");
                description = String(ad.description);
                console.log(description);
                
                //sql save
                
        //        stringCommand = 'INSERT INTO serpTable (keyword, location, ad) VALUES (1, 'Justin Bieber', 22)';
                stringCommand = 'INSERT INTO serpTable (keyword, location, position, title, description) VALUES ("' + query +'", "' + location +'", ' + position + ', "' + title + '", "' + description + '")'; 
                console.log(stringCommand);
                resultsScore  = 0;
                pool.query(stringCommand, function(error, results, field){
                    if(error) throw error;
                    console.log("RESULTS SAVED");
                });
            }
        }
        res.json(res.locals.serpResult);
    });
    
    function get100SERP(req,res, next){
    var completeResultsList = []
    for (var location of cityStateList){
        var query = String(req.query.query);
        url = "https://serpapi.com/search?engine=google&location="+ String(location) + "&q="+ String(query)+"&hl=en&gl=us&output=json&api_key=bc42f9b13acaf3299a9e05a272803212c4d7c7a8b786505076d5e4937a190e39";
        console.log('Google Scrape');
        console.log('Query of: ' + query);
        console.log('Location of: '+ location);
        console.log(url)
        
        var params = {
            url : url,
            headers : {
             'User-Agent': 'request'
            }
        };
        function callback(e, r, body) {
            var obj = JSON.parse(body);
            if(obj.status == 404){
                res.json('Error on call (!)');
            }else{
                console.log(obj);
                completeResultsList.push(obj);
                next();
            }
        }
        request.get(params, callback);

        }
        res.locals.serpResult = completeResultsList;
    }
    
}