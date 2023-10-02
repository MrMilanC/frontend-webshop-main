$(function () {
    $.ajax({
        url: '../pages/footer-sticky.html',
        dataType: 'html',
        success: function (data) {
            $('#footer-sticky').html(data);
        }
    });
});