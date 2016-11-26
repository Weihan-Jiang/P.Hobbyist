$(function() {
    $recommendation = $('a.recommendation');
    $random = $('a.random');
    $recommendCard = $('.recommendCardContainer');
    $randomCard = $('.randomCardContainer');
    $greetingCard = $('.greeting');
    $wrapper2 = $('.wrapper2');
    $recommendation.on('click', function() {
        $recommendCard.removeClass('hide').hide();
        $wrapper2.fadeOut(900, function() {
            $recommendCard.fadeIn(900);
        });
        $('a.back').on('click', function() {
            $recommendCard.fadeOut(900, function() {
                $wrapper2.fadeIn(1000);
            })
        })
    });


    $random.on('click', function() {
        $randomCard.removeClass('hide').hide();
        $wrapper2.fadeOut(900, function() {
            $randomCard.fadeIn(900);
        });
        $('a.back').on('click', function() {
            $randomCard.fadeOut(900, function() {
                $wrapper2.fadeIn(1000);
            })
        })
    });
});