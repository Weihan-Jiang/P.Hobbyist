const api_key = "f97dbeff69a64a985e1c6f3aac12b9c7";
const api_base_url = "https://api.themoviedb.org/3/";

var request = require('request');
var movies = require("../public/data/movie/user_movie.json");
var fs = require('fs');

exports.view = function(req, res) {

    res.render('index');

};

exports.search = function(req, res) {
    var keyword = req.params.keyword;
    var movieSearchAPI = api_base_url + "search/movie/" + "?api_key=" + api_key + "&language=en-US&query=" + keyword + "&page=1";
    console.log("movieSearchAPI is " + movieSearchAPI);
    request.get(movieSearchAPI, function(error, response, body) {
        if (response.statusCode == 200) {
            //console.log(body);
            var searchResult = JSON.parse(body);
            console.log(JSON.stringify(searchResult.results[0]));
            //console.log(res);
            res.render('index', searchResult.results);
        } else {
            console.log('error: ' + response.statusCode)
            console.log(body);
        }
    });
}