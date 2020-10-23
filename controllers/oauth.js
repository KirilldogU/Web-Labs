var simpleoauth2 = require('simple-oauth2');
var request = require('request')

module.exports.set = function(app){
    app.set('trust proxy', 1) // trust first proxy
    
    // -------------- express initialization -------------- //
    
    // Here, we set the port (these settings are specific to our site)
    app.set('port', process.env.PORT || 8080 );
    
    // This is included to while express is sitting behind a proxy
    // app.set('trust proxy', 1) // trust first proxy 
    
    
    // These are keys that we'll use to encrypt our cookie session.
    // If you open the developer tools, you'll find taht we only have 
    // one cookie (named session). All of the subparameters that we add
    // within the cookie (like the OAUTH token, and the javascript variable 
    // name we give the token) will be embedded through double encryption 
    // usiung these keys
    // app.use(cookieSession({
    //   name: 'snorkles',
    //   keys: ['SomeSecretKeys123', 'ThatYouShouldChange456']
    // }))  
    //did this on app.js
    
    
    // -------------- variable initialization -------------- //
    
    // These are parameters provided by the authenticating server when
    // we register our OAUTH client.
    // -- The client ID is going to be public
    // -- The client secret is super top secret. Don't make this visible
    // -- The redirect uri should be some intermediary 'get' request that 
    //     you write in whichyou assign the token to the session.
    
    var ion_client_id = 'STbBPkzwX7qPHOtGWOXJB7Yo35BwVSA1M0PchhhQ';
    var ion_client_secret = '4CLXklhjF3RVszOZoLmUQd0zUPNoqvqSKHHZ2uqppE6RaJBMKVo7po8vTjS78h9pNFdTlnpe0nzR2D8txMVPY3UFxJviplLeAOw7sWOzq7FXw7eqBYwbRKSaTEgruZX3';
    var ion_redirect_uri = 'https://user.tjhsst.edu/2020kusubyan/login_big_dawg';    //    <<== you choose this one
    
    // Here we create an oauth2 variable that we will use to manage out OAUTH operations
    
    var oauth2 = simpleoauth2.create({
      client: {
        id: ion_client_id,
        secret: ion_client_secret,
      },
      auth: {
        tokenHost: 'https://ion.tjhsst.edu/oauth/',
        authorizePath: 'https://ion.tjhsst.edu/oauth/authorize',
        tokenPath: 'https://ion.tjhsst.edu/oauth/token/'
      }
    });
    
    // This is the link that will be used later on for logging in. This URL takes
    // you to the ION server and asks if you are willing to give read permission to ION.
    
    var authorizationUri = oauth2.authorizationCode.authorizeURL({
        scope: "read",
        redirect_uri: ion_redirect_uri
    });
    
    
    // -------------- express 'get' handlers -------------- //
    
    app.get('/login_oauth', function (req, res) {
        
    
        // Here we ask if the token key has been attached to the session...
        console.log(req.session)
        if (!('token' in req.session)) {
            // ...if the token does not exist, this means that the user has not logged in
        
            // if the user has not logged in, we'll send them to a page asking them to log in
            res.redirect(authorizationUri);    
    
        } else {
            console.log('words')
            // ... if the user HAS logged in, we'll send them to a creepy page that knows their name
    
            // Now, we create a personalized greeting page. Step 1 is to 
            // ask ION for your name, which means conducting a request in the
            // background before the user's page is even rendered.
    
            // To start the process of creating an authenticated request, 
            // I take out the string 'permission slip' from 
            // the token. This will be used to make an ION request with your
            // credentials
            var access_token = req.session.token.access_token;
            
            // Next, construct an ION api request that queries the profile using the 
            // individual who has logged in's credentials (it will return) their
            // profile
            var my_ion_request = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token;
    
            // Perform the asyncrounous request ...
            request.get( {url:my_ion_request}, function (e, r, body) {
                // and here, at some later (indeterminite point) we land.
                // Note that this is occurring in the future, when ION has responded
                // with our profile.
    
                // The response from ION was a JSON string, so we have to turn it
                // back into a javascript object
                var res_object = JSON.parse(body);
                console.log(res_object);
                //res.render('login_oauth', res_object);
                res.render('houses', res_object);     //THERE HAS TO BE A WAY TO TELL THESE APART!!!
            });
        }
    });
    
    
    // -------------- intermediary login_worker helper -------------- //
    
    
    async function handleCode(req, res, next) {
        theCode = req.query.code;
    
        var options = {
            'code': theCode,
            'redirect_uri': ion_redirect_uri,
            'scope': 'read'
         };
        
        // needed to be in try/catch
        try {
            var result = await oauth2.authorizationCode.getToken(options);      // await serializes asyncronous fcn call
            var token = oauth2.accessToken.create(result);
            res.locals.token = token;
            next()
        } 
        catch (error) {
            console.log('Access Token Error', error.message);
             res.send(502); // bad stuff, man
        }
    }
    
    app.get('/login_big_dawg', [handleCode], function(req, res) { 
        console.log(res.locals.token)
        req.session.token = res.locals.token.token;
        res.redirect('https://user.tjhsst.edu/2020kusubyan/login_oauth');
    });
    
    app.get('/reset_oauth', function (req, res, next) {
      //req.session = null;                                       // programmatically deletes the cookie
      delete req.session.token;
      res.render('reset_oauth');
    });
}