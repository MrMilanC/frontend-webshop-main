$(document).ready(function () {
    var categoryToken = sessionStorage.getItem("categoryId");
    $.ajax({
        url: "http://localhost:8080/products/view" + categoryToken,
        method: "GET",
        dataType: "json",
        success: console.log("passt"),
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
});


function displayProductsByCategory(data) {
    console.log(data)
    var productTableBodyIndex = $("#productTableBodyIndex");
    productTableBodyIndex.empty(); // Clear existing rows
    var categoryToken = sessionStorage.getItem("categoryId");

    data.forEach(function (product) {
        if (product.category === categoryToken) { // Check if the product belongs to the desired category
            var row = "<tr>";
            row += "<td>" + product.productId + "</td>";
            row += "<td>" + product.productName + "</td>";
            row += "<td>" + product.description + "</td>";
            row += "<td>$" + product.price.toFixed(2) + "</td>";
            row += "<td>" + categoryToken + "</td>";
            row += "<td>" + product.quantity + "</td>";
            row += '<td><img src="/static/img/' + product.imageName + '" height="100px" width="100px" style="border:5px solid black"></td>';
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
            productTableBodyIndex.append(row, showProduct);
        }
    });
}

