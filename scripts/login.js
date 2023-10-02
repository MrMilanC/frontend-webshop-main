var token = "";

$(document).ready(function () {
    $('#btn-login').on('click', function () {
        const apiUrl = "http://localhost:8080/login";
        const data = {
            "username": $('#username').val(),
            "password": $('#password').val()
        };

        $.ajax({
            type: "POST",
            url: apiUrl,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
        })
            .done(function (response) {
                console.log("Response from server:", response);

                // Check if the response contains the token
                if (response.accessToken) {
                    var token = response.accessToken;
                    console.log("Token received:", token);

                    sessionStorage.setItem('token', token);
                    $('#result').val(JSON.stringify(response));
                }

                if (response.hasOwnProperty('ok') && response.ok) {
                    console.log("Login successful");
                    $("#navbar-container").load("navbar-logged-in.html", function () {
                        $(".navbar-default").hide();
                        $(".navbar-logged-in").show();
                    });

                    // Add the fixed-bottom class to the footer
                    $("#footer").addClass("fixed-bottom");

                    window.location.href = '../pages/products.html';
                } else {
                    console.log("Login failed");
                    alert("Invalid information");
                }
            })
            .fail(function (xhr, textStatus, error) {
                console.error("AJAX request failed:", error);
                alert("An error occurred during login. Please try again.");
            });
    });
});
