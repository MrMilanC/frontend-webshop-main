// Read Product Data
function displayProductForUpdate(data) {
    if (data) {
        $("#idUpdate").val(data.productId || "");
        $("#nameUpdate").val(data.productName || "");
        $("#categoryUpdate").val(data.category.categoryId || "");
        $("#priceUpdate").val(data.price ? data.price.toFixed(2) : "");
        $("#quantityUpdate").val(data.quantity || "");
        $("#descriptionUpdate").val(data.description || "");
        sessionStorage.setItem('updateIdForBackend', data.productId);

        if (data.imageName) {
            $("#imgNameUpdate").val(data.imageName);
            $("#imgPreviewUpdate").attr("src", "/frontend-webshop-main/img/user-files/" + data.imageName);
        }
    }
}

$(document).ready(function () {
    var dataToken = sessionStorage.getItem("updateProductId");
    console.log(dataToken);
    $.ajax({
        url: "http://localhost:8080/products/view/" + dataToken,
        method: "GET",
        dataType: "json",
        success: function (data) {
            displayProductForUpdate(data)
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });

});

// Update Product Data

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imgPreview').attr('src', e.target.result).width(100).height(100);
        }
        reader.readAsDataURL(input.files[0])
    }
}

$('#productImageUpdate').change(function () {
    readURL(this);
});

$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

// Ajax request to submit the form
$('#submitProductUpdate').click(function () {
    //var formData = new FormData($('#productForm')[0]);
    var productId = sessionStorage.getItem("updateIdForBackend");
    var formData = new FormData();

    // Add form fields with the expected parameter names in your backend controller
    formData.append("productId", productId);
    formData.append("categoryId", $("#categoryUpdate").val());
    formData.append("imageName", $("#imgNameUpdate").val());
    formData.append("productImage", $("#productImageUpdate")[0].files[0]);

    // Add the rest of the form fields here, e.g., productName, productPrice, etc.
    formData.append("productName", $("#nameUpdate").val());
    formData.append("productPrice", $("#priceUpdate").val());
    formData.append("productDescription", $("#descriptionUpdate").val());
    formData.append("productQuantity", $("#quantityUpdate").val());

    console.log("FormData:", formData);

    var authToken = sessionStorage.getItem("token");
    console.log("AuthToken:", authToken);

    //Function to display users in the table
    if (authToken) {
        $.ajax({
            url: "http://localhost:8080/admin/update/" + productId,
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


