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
        var role = $("#role").val();

        // Create a JSON object with the form data
        var userData = {
            firstName: firstName,
            lastName: lastName,
            username: userName,
            password: password,
            email: email,
            role: role
        };

        // Send the POST request to the Java server
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/admin/users/create",
            data: JSON.stringify(userData), // Convert data to JSON
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                // Handle a successful response from the server
                console.log("Registration successful:", response);
                alert("User erfolgreich registriert")
            },
            error: function (error) {
                // Handle an error response from the server
                console.error("Registration error:", error);
                // You can display an error message to the user here
            }
        });
    });
});



