$(function () {
    $.ajax({
        url: '../pages/navbar.html',
        dataType: 'html',
        success: function (data) {
            $('#navbar-container').html(data);
        }
    });
});

