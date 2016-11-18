const api_key = "f97dbeff69a64a985e1c6f3aac12b9c7";
const api_base_url = "https://api.themoviedb.org/3/";

var request = require('request');
var movies = require("../public/data/movie/user_movie.json");
var indexJSON = require("../public/data/movie/index.json");
var recentJSON = require("../public/data/movie/recent.json");
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
    var newMovie = false;
    var watched;
    if (id.charAt(0) == 'a') {
        id = id.substr(1);
        newMovie = true;
        watched = false;
    }
    console.log("movie id is " + id);
    var movieInfoAPI = api_base_url + "movie/" + id + "?api_key=" + api_key;
    console.log(movieInfoAPI);
    request.get(movieInfoAPI, function(error, response, body) {
        if (response.statusCode == 200) {
            console.log(body);
            var movieInfo = JSON.parse(body);
            console.log("!!!movieINFO" + JSON.stringify(movieInfo));
            for (var temp = 0; temp < movies.movies.length; temp++) {
                console.log("right now check :" + movies.movies[temp].title);
                if (movies.movies[temp].title == movieInfo.title) {
                    console.log('find the movie ' + movies.movies[temp].title);
                    newMovie = false;
                    console.log("set newmovie to false" + newMovie);
                    console.log("watched is" + movies.movies[temp].watched);
                    if (movies.movies[temp].watched) {
                        watched = true;
                        console.log("set watched to true, " + watched);
                        break;
                    }
                    break;
                }
            }
            movieInfo.newMovie = (newMovie == true);
            movieInfo.added = (!(newMovie == true));
            movieInfo.redirected = (!true);
            movieInfo.watched = (watched == true);
            var notInRecent = true;
            for (var i = 0; i < indexJSON.recent.length; i++) {
                console.log("search for movie in indexJSON in view, " + indexJSON.recent[i].title);
                if (indexJSON.recent[i].title == movieInfo.title) {
                    notInRecent = false;
                    indexJSON.recent.unshift(indexJSON.recent[i]);
                    indexJSON.recent.splice(i + 1, 1);
                    console.log("shift to top");
                }
            }
            if (notInRecent) {
                indexJSON.recent.unshift(movieInfo);
                console.log("first element in indexJSON is " + indexJSON.recent[0].title);
            }
            fs.writeFileSync("public/data/movie/index.json", JSON.stringify(indexJSON));

            /*if (newMovie) {
                console.log("trying to find movies");
                for (var i = 0; i < movies.movies.length; i++) {
                    if (movies.movies[i].title == movieInfo.title) {
                        newMovie = 0;
                        console.log('0');
                        movieInfo.newMovie = (true == newMovie);
                        if (movies.movies[i].watched) {
                            watched = true;
                            movieInfo.watched = true;
                        } else {
                            watched = false;
                            movieInfo.watched = (true==watched);
                        }
                        break;
                    } else {
                        console.log("1");
                        movieInfo.newMovie = true;
                        movieInfo.watched = false;
                    }
                }

            } else {
                movieInfo.newMovie = (true == newMovie);
                movieInfo.watched = false;
            }*/

            res.render('movieDetail', movieInfo);
            console.log("new movie is " + movieInfo.newMovie);
            console.log("wathced is " + movieInfo.watched);
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
    /*    indexJSON = require("../public/data/movie/index.json");*/
    for (var i = 0; i < indexJSON.recent.length; i++) {
        if (indexJSON.recent[i].imdb_id == imdb) {
            console.log("find the movie in indexJSON" + indexJSON.recent[i].title);
            console.log("watched before modifed " + indexJSON.recent[i].watched);
            indexJSON.recent[i].watched = (req.param.status === "true");
            console.log("watched after modified " + indexJSON.recent[i].watched);
            indexJSON.recent.unshift(indexJSON.recent[i]);
            indexJSON.recent.splice(i + 1, 1);
            fs.writeFileSync("public/data/movie/index.json", JSON.stringify(indexJSON));
            break;
        }
    }
};

exports.add = function(req, res) {
    console.log(req.body); //FIX req.body 
    fs.writeFileSync("public/data/movie/user_movie.json", JSON.stringify(req.body));
    var imdb = req.body.imdb;
    /*indexJSON = require("../public/data/movie/index.json");
     */
    console.log("upadta indexJSON file : " + req.body.title);
    for (var i = 0; i < indexJSON.recent.length; i++) {
        console.log("currently at index of " + i + " : " + indexJSON.recent[i].title);
        if (indexJSON.recent[i].imdb_id == imdb) {
            console.log("found the movie in indexJSON");
            console.log("added before modified: " + indexJSON.recent[i].added);
            indexJSON.recent[i].added = true;
            console.log("added after modified: " + indexJSON.recent[i].added);
            console.log("newMovie before modifed " + indexJSON.recnet[i].newMovie);
            indexJSON.recnet[i].newMovie = (!true);
            console.log("newMovie after modifed " + indexJSON.recnet[i].newMovie);
            console.log("before shift" + indexJSON.recent[i]);
            indexJSON.recent.unshift(indexJSON.recent[i]);
            indexJSON.recent.splice(i + 1, 1);

            console.log("after shift" + indexJSON.recent[i]);
            break;
        }
    }
    fs.writeFileSync("public/data/movie/index.json", JSON.stringify(indexJSON));

    /* res.sendStatus(200);*/
};