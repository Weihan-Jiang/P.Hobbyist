const api_key = "f97dbeff69a64a985e1c6f3aac12b9c7";
const api_base_url = "https://api.themoviedb.org/3/";

var request = require('request');
var movies = require("../public/data/movie/user_movie.json");
var fs = require('fs');

function getMovieInfo(imdb) {
    var movieInfoAPI = api_base_url + "movie/" + imdb + "?api_key=" + api_key;
    console.log(movieInfoAPI);
    request.get(movieInfoAPI, function(error, response, body) {
        if (response.statusCode == 200) {
            console.log(body);
            var movieInfo = JSON.parse(body);
            console.log("!!!movieINFO" + movieInfo);
            return movieInfo;
        } else {
            console.log('error: ' + response.statusCode)
            console.log(body);
        }
    });
}





exports.view = function(req, res) {
    var id = req.params.id;
    console.log("movie id is " + id);
    var movieInfoAPI = api_base_url + "movie/" + id + "?api_key=" + api_key;
    console.log(movieInfoAPI);
    request.get(movieInfoAPI, function(error, response, body) {
        if (response.statusCode == 200) {
            console.log(body);
            var movieInfo = JSON.parse(body);
            console.log("!!!movieINFO" + JSON.stringify(movieInfo));
            res.render('movieDetail', movieInfo);
        } else {
            console.log('error: ' + response.statusCode)
            console.log(body);
        }
    });



};

exports.update = function(req, res) {
    console.log("!!!!!");
    //console.log(req);
    console.log("status is " + req.params.status);
    var imdb = req.params.id;
    for (var i = 0; i < movies.movies.length; i++) {
        console.log("currently at " + movies.movies[i].imdb);
        if (movies.movies[i].imdb == imdb) {
            console.log("find the movie " + movies.movies[i].imdb);
            console.log("current status " + movies.movies[i].watched);
            console.log("status is " + req.params.status);
            movies.movies[i].watched = (req.params.status === "true");
            console.log("boolean is " + Boolean(req.params.status));
            console.log("after modified " + movies.movies[i].watched);
            console.log("status is " + req.params.status);
            //Serialize as JSON and Write it to a file
            fs.writeFileSync("public/data/movie/user_movie.json", JSON.stringify(movies));
            break;
        }

    }
};