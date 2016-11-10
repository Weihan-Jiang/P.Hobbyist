$(function() {
    var $search = $('.search:input');
    $search.on('input', function() {
        var value = $search.val();
        console.log(value);
        if (value.length > 1) {
            $('.search-result').show();
            $.post("/" + value);
        } else {
            $('.search-result').hide();

        }
    })
});