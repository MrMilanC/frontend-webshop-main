/*$(document).ready(function () {

    var authToken = sessionStorage.getItem("token");
    console.log("AuthToken:", authToken);

    // Function to display users in the table
    if (authToken) {
        $.ajax({
            url: "http://localhost:8080/register",
            method: "POST",
            dataType: "json",
            headers: {
                Authorization: "Bearer " + authToken
            },
            //cors: true,
            success: function (data) {
                displayUsers(data)
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    } else {
        // Handle the case where authToken is not found in sessionStorage
        console.error("Authentication token not found in sessionStorage.");
    }
});*/

console.log("Script loaded");
$(document).ready(function () {
    $("#registerButton").click(function (event) {
        event.preventDefault();

        // Retrieve form data
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var userName = $("#userName").val();
        var password = $("#password").val();
        var email = $("#email").val();

        // Create a JSON object with the form data
        var userData = {
            firstName: firstName,
            lastName: lastName,
            username: userName,
            password: password,
            email: email
        };

        // Send the POST request to the Java server
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/register/create",
            data: JSON.stringify(userData), // Convert data to JSON
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                // Handle a successful response from the server
                console.log("Registration successful:", response);
                // You can redirect the user or display a success message here
            },
            error: function (error) {
                // Handle an error response from the server
                console.error("Registration error:", error);
                // You can display an error message to the user here
            }
        });
    });
});

/*
console.log("Script loaded");
$(document).ready(function () {
    $("#registerButton").on("click", _e => {
        console.log("Button clicked");
        $(".input-error").removeClass("input-error");
        $(".error-message").remove();

        const newUser = {
            "firstName": $("#firstName").val(),
            "lastName": $("#lastName").val(),
            "userName": $("#userName").val(),
            "password": $("#password").val(),
            "email": $("#email").val(),
        }

        $.ajax({
            url: "http://localhost:8080/register/create",
            type: "POST",
            /*cors: true,
            headers: {
                Authorization: "Bearer " + authToken
            },
            contentType: "application/json",
            data: JSON.stringify(newUser),
            success: console.log,
            error: error => {
                console.log(error);
                if (error.status === 400) {
                    for (let err of error.responseJSON.errors) {
                        const input = $("#" + err.field + "Input");
                        input.addClass("input-error");
                        const parent = input.parent();
                        parent.append(`<p class="error-message">${err.defaultMessage}</p>`);
                    }
                    handleErrors(error.responseJSON.errors);
                }
            }
        });
    })
});*/

