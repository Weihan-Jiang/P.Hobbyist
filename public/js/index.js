$(function() {
    $recommend = $('a.recommend');
    $add = $('a.add');
    $watched = $('a.watched');
    // $watchlist = $('a.watchlist');
    // $watchlist.on('click', function() {
    //     $('.macro-container').fadeOut();
    // });
    $recommend.on('click', function() {
        console.log("recommend button is clicked");
        var classAttr = $recommend.attr('class');
        console.log("current status is" + classAttr);
        if (classAttr.includes("recommended")) {
            console.log("this movie is recommened, undo recommend");
            postURL = "/recommend/" + $recommend.attr('id') + "/false";
            console.log("postURL is " + postURL);
            $.post(postURL, { "recommend": false }, function(result) {
                console.log(result);
                if (result == "200") {
                    $recommend.removeClass('recommended');
                    $recommend.text('recommend');
                    Materialize.toast('successfully undo', 2000);
                } else {
                    Materialize.toast('error occurred', 2000);
                }
            })
        } else {
            postURL = "/recommend/" + $recommend.attr('id') + "/true";
            console.log("postURL is " + postURL);
            $.post(postURL, { "recommend": true }, function(result) {
                console.log(result);
                if (result == "200") {
                    $recommend.addClass('recommended');
                    $recommend.text('undo recommend');
                    Materialize.toast('recommended', 2000);
                } else {
                    Materialize.toast('error occurred', 2000);
                }
            })

        }
    })

    $watched.on('click', function() {
        console.log("watched button is clicked");
        var classAttr = $watched.attr('class');
        console.log("current status is" + classAttr);
        if (classAttr.includes("watched")) {
            console.log("this movie is watched , undo watched");
            postURL = "/watched/" + $watched.attr('id') + "/false";
            console.log("postURL is " + postURL);
            $.post(postURL, { "watched": false }, function(result) {
                console.log(result);
                if (result == "200") {
                    $watched.removeClass('watched');
                    $watched.text('seen?');
                    Materialize.toast('successfully undo', 2000);
                } else {
                    Materialize.toast('error occurred', 2000);
                }
            })
        } else {
            postURL = "/watched/" + $watched.attr('id') + "/true";
            console.log("postURL is " + postURL);
            $.post(postURL, { "watched": true }, function(result) {
                console.log(result);
                if (result == "200") {
                    $watched.addClass('watched');
                    $watched.text('add back to watchlist');
                    Materialize.toast('watched', 2000);
                } else {
                    Materialize.toast('error occurred', 2000);
                }
            })

        }
    })

    $add.on('click', function() {
        console.log("add button is clicked");
        var classAttr = $add.attr('class');
        console.log("current status is" + classAttr);
        if (classAttr.includes("added")) {
            console.log("this movie is added , undo added");
            postURL = "/add/" + $add.attr('id') + "/false";
            console.log("postURL is " + postURL);
            $.post(postURL, { "add": false }, function(result) {
                console.log(result);
                if (result == "200") {
                    $add.removeClass('added');
                    $add.text('add back to watchlist');
                    Materialize.toast('successfully undo', 2000);
                } else {
                    Materialize.toast('error occurred', 2000);
                }
            })
        } else {
            postURL = "/add/" + $add.attr('id') + "/true";
            console.log("postURL is " + postURL);
            $.post(postURL, { "add": true }, function(result) {
                console.log(result);
                if (result == "200") {
                    $add.addClass('added');
                    $add.text('remove from watchlist');
                    Materialize.toast('added', 2000);
                } else {
                    Materialize.toast('error occurred', 2000);
                }
            })

        }
    })
})