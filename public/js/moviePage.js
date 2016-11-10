var currentLocation = window.location.href;
console.log(currentLocation);
var index = currentLocation.lastIndexOf("/");
var imdb = currentLocation.substring(index + 1);
console.log(imdb);



$(function() {
    $.getJSON("../data/movie/user_movie.json").done(function(data) {
        console.log("data is " + JSON.stringify(data));
        for (var i = 0; i < data.movies.length; i++) {
            console.log("currently at " + data.movies[i].imdb);
            if (data.movies[i].imdb == imdb) {
                console.log("find the movie " + data.movies[i].imdb);
                if (data.movies[i].watched) {
                    console.log("find the movie and watched");
                    $('a#watched i').text("done");
                    $('a#watched').addClass("watched");
                    break;
                }
            }

        }

    });
    $('a#watched').on('click', function() {
        var classAttr = $('a#watched').attr('class');
        console.log(classAttr);
        if (classAttr.includes("watched")) {
            console.log("?????");
            $.post(imdb + "/false", {
                "watched": false
            })
            $(this).removeClass('watched');
            $('a#watched i').text("cloud");
        } else {
            $.post(imdb + "/true", {
                "watched": true
            })
            $(this).addClass('watched');
            $('a#watched i').text("done");
        }
    });
});