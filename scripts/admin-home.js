$(document).ready(function () {

    var authToken = sessionStorage.getItem("token");

    // Function to display products in the table
    if (authToken) {
        $.ajax({
            // url: "http://localhost:8080/products/view",
            // method: "GET",
            dataType: "json",
            headers: {
                Authorization: "Bearer " + authToken
            },
            //cors: true,
            success: window.location.href = '../pages/admin-home.html',
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    } else {
        // Handle the case where authToken is not found in sessionStorage
        console.error("Authentication token not found in sessionStorage.");
    }
});