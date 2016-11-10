$(function() {
    var mySwiper = new Swiper('.swiper-container-o', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        pagination: '.swiper-pagination-o',
        parallax: true,
        speed: 600,

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
    var upperSwiper = new Swiper('.swiper-container-u', {
        direction: 'horizontal',
        loop: false,
        nested: true,
        pagination: '.swiper-pagination-u',

    })

    /*    $('i.material-icons.close').hide();
     */
    var $search = $('.search:input');
    $('.search-result').hide();
    $('i.material-icons.close').hide();

    $search.on('focus', function() {
        $('i.material-icons.close').show();
        $('form').animate({
            paddingLeft: "0px"
        }, 500);
    })

    $search.on('blur', function() {
        $('form').animate({
            paddingLeft: "8rem"
        }, 500);
    })

    $('i.material-icons.close').on('click', function() {
        $('.search-result').hide();
        $('i.material-icons.close').hide();
        $search.val('');
    })

    var $randomContent = $('.random-wrapper-movie');
    var $random = $('.random-movie.btn');
    $randomContent.hide();
    $random.on('click', function() {
        console.log('clicked random button');
        $random.hide();
        $randomContent.show();
        console.log('showed result');

    })

});