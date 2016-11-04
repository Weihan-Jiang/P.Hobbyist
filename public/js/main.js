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


jQuery(document).ready(function($){
    
    
    
    // external js: isotope.pkgd.js

var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  stagger: 30
});

$('.grid').masonry({
    columnWidth: 400,
    itemSelector:'.grid-item'
})

$('.filter-button-group').on( 'click', '.button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});

// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.checked').removeClass('checked');
    $( this ).addClass('checked');
  });
})
});

$('.grid').masonry({
    columnWidth: 600,
    itemSelector: '.grid-item'
})