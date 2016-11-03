$(function() {
    var mySwiper = new Swiper('.swiper-container-o', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        pagination: '.swiper-pagination'

    })
    var nestedSwiper = new Swiper('.swiper-container-n', {
        direction: 'horizontal',
        loop: false,
        nested: true,
        slidesPerView: 5,
        spaceBetween: 30,
        free: true,
        breakpoints: {
            767: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    })



    var $search = $('.search:input');
    $('.search-result').hide();

    $search.on('focus', function() {
        $('form').animate({
            paddingLeft: "0px"
        }, 500);
    })

    $search.on('blur', function() {
        console.log("blur?");
        $('form').animate({
            paddingLeft: "8rem"
        }, 500);
    })

    $search.on('input', function() {
        var value = $search.val();
        if (value.length > 1) {
            $('.search-result').show();
        }
    })
});