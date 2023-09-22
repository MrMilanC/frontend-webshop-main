function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imgPreview').attr('src', e.target.result).width(100).height(100);
        }
        reader.readAsDataURL(input.files[0])
    }
}

$('#productImage').change(function () {
    readURL(this);
});

$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
/*
// Ajax request to populate categories
$.ajax({
    url: "http://localhost:8080/admin/products/add",
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        var categorySelect = $('#category');
        categorySelect.empty();
        $.each(data, function (index, category) {
            categorySelect.append($('<option>', {
                value: category.id,
                text: category.name
            }));
        });
    },
    error: function (error) {
        console.log(error);
    }
});*/

// Ajax request to submit the form
$('#submitProduct').click(function () {
    //var formData = new FormData($('#productForm')[0]);
    var formData = new FormData();

    // Add form fields with the expected parameter names in your backend controller
    formData.append("categoryId", $("#category").val());
    formData.append("imageName", $("#imgName").val());
    formData.append("productImage", $("#productImage")[0].files[0]);

    // Add the rest of the form fields here, e.g., productName, productPrice, etc.
    formData.append("productName", $("#name").val());
    formData.append("productPrice", $("#price").val());
    formData.append("productDescription", $("#description").val());
    formData.append("productQuantity", $("#quantity").val());


    $.ajax({
        url: "http://localhost:8080/admin/products/add",
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // Handle success response
        },
        error: function (error) {
            // Handle error
            console.log(error);
        }
    });
});
