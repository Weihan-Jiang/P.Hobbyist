// /**
//  * Introduction to Human-Computer Interaction
//  * Lab 2
//  * --------------
//  * Created by: Michael Bernstein
//  * Last updated: December 2013
//  */
// var PORT = 3000;

// // Express is a web framework for node.js
// // that makes nontrivial applications easier to build
// var express = require('express');

// // Create the server instance
// var app = express();

// // Print logs to the console and compress pages we send
// app.use(express.logger());
// app.use(express.compress());

// // Return all pages in the /static directory
// // whenever they are requested at '/'
// // e.g., http://localhost:3000/index.html
// // maps to /static/index.html on this machine
// app.use(express.static(__dirname));

// // Start the server
// var port = process.env.PORT || PORT; // 80 for web, 3000 for development
// app.listen(port, function() {
// 	console.log("Node.js server running on port %s", port);
// });

/**

 * Module dependencies.

 */



var express = require('express');

var http = require('http');

var path = require('path');

var handlebars = require('express3-handlebars');





var index = require('./routes/index');

var book = require('./routes/book');

var movie = require('./routes/movie');

var movieHistory = require('./routes/movieHistory');

var bookHistory = require('./routes/bookHistory');

// Example route

// var user = require('./routes/user');



var app = express();



// all environments

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', handlebars());

app.set('view engine', 'handlebars');

app.use(express.favicon());

app.use(express.logger('dev'));

app.use(express.json());

app.use(express.urlencoded());

app.use(express.methodOverride());

app.use(express.cookieParser('Intro HCI secret key'));

app.use(express.session());

app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));



// development only

if ('development' == app.get('env')) {

    app.use(express.errorHandler());

}



// Add routes here

app.get('/', index.view);
app.get('/book', book.view);
app.get('/movie', movie.view);
app.get('/bookHistory', bookHistory.view);
app.get('/movieHistory', movieHistory.view);
// Example route

// app.get('/users', user.list);



http.createServer(app).listen(app.get('port'), function() {

    console.log('Express server listening on port ' + app.get('port'));

});

//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap