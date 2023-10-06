// Read Data
function displayProductForDetail(data) {
    if (data) {
        $("#idDetail").val(data.productId || "");
        $("#nameDetail").val(data.productName || "");
        $("#categoryDetail").val(data.category.categoryId || "");
        $("#priceDetail").val(data.price ? data.price.toFixed(2) : "");
        $("#quantityDetail").val(data.quantity || "");
        $("#descriptionDetail").val(data.description || "");
        //sessionStorage.setItem('DetailIdForBackend', data.productId);
        if (data.imageName) {
            $("#imgNameDetail").val(data.imageName);
            $("#imgPreviewDetail").attr("src", "/frontend-webshop-main/img/user-files/" + data.imageName);
        }
    }
}
$(document).ready(function () {
    var dataToken = sessionStorage.getItem("productId");
    console.log(dataToken);
    $.ajax({
        url: "http://localhost:8080/products/view/" + dataToken,
        method: "GET",
        dataType: "json",
        success: function (data) {
            displayProductForDetail(data)
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
});
