$(document).ready(function () {
    var categoryToken = sessionStorage.getItem("categoryId");
    $.ajax({
        url: "http://localhost:8080/products/view" + categoryToken,
        method: "GET",
        dataType: "json",
        success: console.log("passt"),
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
});




