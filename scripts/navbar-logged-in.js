$(function () {
    $.ajax({
        url: '../pages/navbar-logged-in.html',
        dataType: 'html',
        success: function (data) {
            $('#navbar-container').html(data);
        }
    });
});