// Read User Data
function displayUserForUpdate(data) {
    if (data) {
        $("#idUpdate").val(data.id || "");
        $("#firstNameUpdate").val(data.firstName || "");
        $("#lastNameUpdate").val(data.lastName || "");
        $("#userNameUpdate").val(data.username || "");
        $("#passwordUpdate").val(data.password || "");
        $("#emailUpdate").val(data.email || "");
        $("#roleUpdate").val(data.role || "");
        sessionStorage.setItem('updateUserIdForBackend', data.id);
    }
}

$(document).ready(function () {
    var dataToken = sessionStorage.getItem("updateUserId");
    console.log(dataToken);

    var authToken = sessionStorage.getItem("token");
    console.log("AuthToken:", authToken);

    $.ajax({
        url: "http://localhost:8080/admin/users/view/" + dataToken,
        method: "GET",
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + authToken
        },
        success: function (data) {
            displayUserForUpdate(data)
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });

});


// Update User Data

$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

// Ajax request to submit the form
$('#updateUserButton').click(function () {
    //var formData = new FormData($('#productForm')[0]);
    var userId = sessionStorage.getItem("updateUserIdForBackend");
    var formData = new FormData();

    // Add form fields with the expected parameter names in your backend controller
    formData.append("userId", userId);
    formData.append("userFirstName", $("#firstNameUpdate").val()); // Fix this line
    formData.append("userLastName", $("#lastNameUpdate").val());
    formData.append("userUserName", $("#userNameUpdate").val());
    formData.append("userPassword", $("#passwordUpdate").val());
    formData.append("userEmail", $("#emailUpdate").val());
    formData.append("userRole", $("#roleUpdate").val());


    console.log("FormData:", formData);

    var authToken = sessionStorage.getItem("token");
    console.log("AuthToken:", authToken);

    //Function to display users in the table
    if (authToken) {
        $.ajax({
            url: "http://localhost:8080/admin/users/update/" + userId,
            method: "PUT",
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                Authorization: "Bearer " + authToken
            },
            success: function (response) {
                // Handle success response
            },
            error: function (error) {
                // Handle error
                console.log(error);
            }
        });
    } else {
        // Handle the case where authToken is not found in sessionStorage
        console.error("Authentication token not found in sessionStorage.");
    }
});
