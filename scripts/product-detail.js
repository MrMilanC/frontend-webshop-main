function displayProducts(data) {
    var productTableBody = $("#productTableBodyDetail");
    productTableBody.empty(); // Clear existing rows
    var dataToken = sessionStorage.getItem("productId");

    dataToken.forEach(function (product) {
        var row = "<tr>";
        row += "<td>" + product.productId + "</td>";
        row += "<td>" + product.productName + "</td>";
        row += "<td>" + product.description + "</td>";
        row += "<td>$" + product.price.toFixed(2) + "</td>";
        row += "<td>" + product.category + "</td>";
        row += "<td>" + product.quantity + "</td>";
        row += '<td><img src="' + product.jpgURL + '" height="100px" width="100px" style="border:5px solid black"></td>';
        row += "</tr>";
        productTableBody.append(row);
    });
}

$(document).ready(function () {
    var dataToken = sessionStorage.getItem("productId");
        $.ajax({
            url: "http://localhost:8080/products/view" + dataToken,
            method: "GET",
            dataType: "json",
            success: function (data) {
                displayProducts(data)
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });

});


// $(document).ready(function() {
//     // Make an AJAX request to load product data from the server
//         var authToken = sessionStorage.getItem("productId");
//     $.ajax({
//         url: "http://localhost:8080/admin/products/view/"+ productId,
//         method: 'GET',
//         success: function(data) {
//             // Update the product details using the received data
//             $('#productImage').attr('src', '/productImages/' + data.imageName);
//             $('#productName').text(data.name);
//             $('#productCategory').text(data.category.name);
//             $('#productPrice').text(data.price);
//             $('#productWeight').text(data.weight);
//             $('#productDescription').text(data.description);
//             $('#addToCartBtn').attr('href', '/addToCart/' + data.id);
//
//             // Update the cart count (replace with the actual count)
//             $('#cartCount').text(data.cartCount);
//         },
//         error: function(error) {
//             console.error('Error loading product data:', error);
//         }
//     });
// });
