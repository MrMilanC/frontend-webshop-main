$(function () {
    $.ajax({
        url: '../pages/footer.html',
        dataType: 'html',
        success: function (data) {
            $('#footer-container').html(data);
        }
    });
});