function displayUsers(data) {
    var userTableBody = $("#userTableBody");
    userTableBody.empty(); // Clear existing rows

    data.forEach(function (user) {
        var row = "<tr>";
        row += "<td>" + user.id + "</td>";
        row += "<td>" + user.firstName + "</td>";
        row += "<td>" + user.lastName + "</td>";
        row += "<td>" + user.role + "</td>";
        row += "<td>" + user.username + "</td>";
        row += "<td>" + user.email + "</td>";
        row += "</tr>";
        console.log(user.id);

        var authToken = sessionStorage.getItem("token");
        console.log("AuthToken:", authToken);

        var deleteUser = $('<td>').append(
            $('<a>').attr('href', '#' + user.id)
                .addClass('btn btn-danger')
                .text('Delete')
                .click(function (e) {
                    e.preventDefault();
                    var userId = user.id;
                    console.log(userId)// REMOVE
                    $.ajax({
                        url: "http://localhost:8080/admin/users/remove/" + userId,
                        method: "DELETE",
                        dataType: "json",
                        headers: {
                            Authorization: 'Bearer ' + authToken
                        },
                        success: function () {
                            location.reload();
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                            console.log(userId)
                        }
                    });
                })
        );
        var updateUser = $('<td>').append(
            $('<a>').attr('href', '#' + user.id)
                .addClass('btn btn-warning')
                .text('Update')
                .click(function (e) {
                    e.preventDefault();
                    var userId = user.id;
                    console.log(userId);
                    $.ajax({
                        url: "http://localhost:8080/admin/users/view/"+ userId,
                        method: "GET",
                        dataType: "json",
                        headers: {
                            Authorization: 'Bearer ' + authToken
                        },
                        success: function (data) {
                            console.log("Update user", data);
                            sessionStorage.setItem('updateUserId', userId);
                            window.location.href = "admin-user-update.html";
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        }
                    });
                })
        );
        userTableBody.append(row, deleteUser, updateUser);
    });
}

$(document).ready(function () {

    var authToken = sessionStorage.getItem("token");
    console.log("AuthToken:", authToken);

    //Function to display users in the table
   if (authToken) {
        $.ajax({
            url: "http://localhost:8080/admin/users/view",
            method: "GET",
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
});


