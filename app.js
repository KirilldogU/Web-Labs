#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var path = require('path');
var app = express();
var request = require('request')
var fs = require('fs');
var cookieSession = require('cookie-session')
var hbs = require('hbs');
var simpleoauth2 = require('simple-oauth2');
var axios = require('axios');


// -------------- express initialization -------------- //
app.set('port', process.env.PORT || 8080 );

// tell express that the view engine is hbsi
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  name: 'account_cooky',                         // ==> the name of the cookie is snorkles      
  keys: ['enc_key_cookyy', 'enkey_cookoofocooky']   // ==> these two keys encrypt the cookie. CHANGE THEM! 
}));

chars = fs.readFileSync(__dirname + '/public/resources//condimentState.txt').toString();
cityText = fs.readFileSync(__dirname + '/public/resources//cities_states.txt').toString();

var controllers = require('./controllers');
controllers.set(app);

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});