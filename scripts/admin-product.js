function displayProducts(data) {
    var productTableBody = $("#productTableBodyAdmin");
    productTableBody.empty(); // Clear existing rows

    data.forEach(function (product) {
        var row = "<tr>";
        row += "<td>" + product.productId + "</td>";
        row += "<td>" + product.productName + "</td>";
        row += "<td>" + product.description + "</td>";
        row += "<td>$" + product.price.toFixed(2) + "</td>";
        row += "<td>" + product.category.categoryId + "</td>";
        row += "<td>" + product.quantity + "</td>";
        row += '<td><img src="/frontend-webshop-main/img/user-files/' + product.imageName + '" height="100px" width="100px" style="border:5px solid black"></td>';
        row += "</tr>";
        var showProduct = $('<td>').append(
            $('<a>').attr('href', '#' + product.id)
                .addClass('btn btn-success')
                .text('Show')
                .click(function (e) {
                    e.preventDefault();
                    var productId = product.productId;
                    $.ajax({
                        url: "http://localhost:8080/products/view/" + productId,
                        method: "GET",
                        dataType: "json",
                        success: function (data) {
                            console.log("Show product", data);
                            sessionStorage.setItem('productId', productId);
                            window.location.href = "product-detail.html";
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        }
                    });
                })
        );
        var deleteProduct = $('<td>').append(
            $('<a>').attr('href', '#' + product.id)
                .addClass('btn btn-danger')
                .text('Delete')
                .click(function (e) {
                    e.preventDefault();
                    var productId = product.productId;
                    $.ajax({
                        url: "http://localhost:8080/admin/products/remove/" + productId,
                        method: "DELETE",
                        dataType: "json",
                        success: location.reload(), //console.log("Deleted"),
                        error: function (xhr, status, error) {
                            console.error(error);
                        }
                    });
                })
        );
        var updateProduct = $('<td>').append(
            $('<a>').attr('href', '#' + product.id)
                .addClass('btn btn-warning')
                .text('Update')
                .click(function (e) {
                    e.preventDefault();
                    var productId = product.productId;
                    $.ajax({
                        url: "http://localhost:8080/products/view/" + productId,
                        method: "GET",
                        dataType: "json",
                        success: function (data) {
                            console.log("Update product", data);
                            sessionStorage.setItem('updateId', productId);
                            window.location.href = "admin-product-update.html";
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        }
                    });
                })
        );
        productTableBody.append(row, showProduct, deleteProduct, updateProduct);
    });
}

$(document).ready(function () {

    var authToken = sessionStorage.getItem("token");
    console.log("AuthToken:", authToken);

    // Function to display products in the table
    if (authToken) {
        $.ajax({
            url: "http://localhost:8080/products/view",
            method: "GET",
            dataType: "json",
            headers: {
                Authorization: "Bearer " + authToken
            },
            //cors: true,
            success: function (data) {
                displayProducts(data)
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


