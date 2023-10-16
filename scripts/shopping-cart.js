$(document).ready(function () {

    var authToken = sessionStorage.getItem("token");
    console.log("AuthToken:", authToken);

    var tokens = authToken.split(".");
    var payload = JSON.parse(atob(tokens[1])); // Parse the token payload as JSON
    var username = payload.username; // Extract the username from the payload
    sessionStorage.setItem('usernameTokenCart', username);

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
                displayProductsShoppingList(data)
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    } else {
        // Handle the case where authToken is not found in sessionStorage
        console.error("Authentication token not found in sessionStorage.");
    }

    //Function to display products in the table
    if (authToken) {
        $.ajax({
            url: "http://localhost:8080/cart/view/" + username,
            method: "GET",
            dataType: "json",
            headers: {
                Authorization: "Bearer " + authToken
            },
            //cors: true,
            success: function (data) {
                displayProductsInCart(data)
                updateCartTotal()
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


function displayProductsShoppingList(data) {
    var productTableBodyCart = $("#productTableBodyCart");
    productTableBodyCart.empty(); // Clear existing rows

    var userName = sessionStorage.getItem("usernameTokenCart");
    var total = parseFloat(sessionStorage.getItem('cartPriceTotal')) || 0;

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
                .text('Anzeigen')
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

        var cartProduct = $('<td>').append(
            $('<a>').attr('href', '#' + product.id)
                .addClass('btn btn-success')
                .text('Kaufen')
                .click(function (e) {
                    e.preventDefault();
                    var productId = product.productId;
                    var priceForCart = product.price.toFixed(2);
                    total += parseFloat(priceForCart);
                    sessionStorage.setItem('cartPriceTotal', total.toString());

                    $.ajax({
                        url: "http://localhost:8080/cart/add/" + productId,
                        method: "POST",
                        data: {userName: userName},
                        success: function (data) {
                            // updateCartTotal()
                            location.reload();
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        }
                    });
                })
        );
        productTableBodyCart.append(row, showProduct, cartProduct);
    });
}


//////////////////////
// FETCH CART
//////////////////////

function displayProductsInCart(data) {
    var productTableBodyBought = $("#productTableBodyBought");
    productTableBodyBought.empty(); // Clear existing rows

    if (!data || !Array.isArray(data.cartItems)) {
        console.error("Data is not in the expected format:", data);
        return; // Return early to prevent further processing
    }

    var total = parseFloat(sessionStorage.getItem('cartPriceTotal')) || 0;
    var fetchQuantityPromises = data.cartItems.map(function (cartItem) {
        return new Promise(function (resolve, reject) {
            getProductQuantityForCart(cartItem.product, function (quantity) {
                resolve({ product: cartItem.product, quantity: quantity });
            });
        });
    });

    Promise.all(fetchQuantityPromises).then(function (results) {
        results.forEach(function (result) {
            var product = result.product;
            var quantityInCart = parseInt(result.quantity);

            //tabelle

        var row = "<tr>";
        row += "<td>" + product.productId + "</td>";
        row += "<td>" + product.productName + "</td>";
        row += "<td>" + product.description + "</td>";
        row += "<td>$" + product.price.toFixed(2) + "</td>";
        row += "<td>" + product.category.categoryId + "</td>";
        //row += "<td>" + product.quantity + "</td>";
        row += '<td><img src="/frontend-webshop-main/img/user-files/' + product.imageName + '" height="100px" width="100px" style="border:5px solid black"></td>';
        row += "<td>" + quantityInCart + "</td>";   ////////////////////////////////////////  -----> MENGE
        row += "</tr>";

        var showProduct = $('<td>').append(
            $('<a>').attr('href', '#' + product.id)
                .addClass('btn btn-success')
                .text('Anzeigen')
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

        var cartProductDelete = $('<td>').append(
            $('<a>').attr('href', '#' + product.id)
                .addClass('btn btn-success')
                .text('Entfernen')
                .click(function (e) {
                    e.preventDefault();
                    var authToken = sessionStorage.getItem("token");
                    var tokens = authToken.split(".");
                    var payload = JSON.parse(atob(tokens[1])); // Parse the token payload as JSON
                    var userName = payload.username; // Extract the username from the payload

                    var productId = product.productId;
                    var priceForCart = product.price.toFixed(2);
                    total -= parseFloat(priceForCart);
                    sessionStorage.setItem('cartPriceTotal', total.toString());

                    $.ajax({
                        url: "http://localhost:8080/cart/remove/" + productId + "?userName=" + userName,
                        method: "DELETE",
                        success: function (data) {
                            location.reload();
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        }
                    });
                })
        );
        productTableBodyBought.append(row, showProduct, cartProductDelete);
    });
    });
}

//////////////////////
// Empty Cart
//////////////////////

function emptyCart() {
    var authToken = sessionStorage.getItem("token");
    var tokens = authToken.split(".");
    var payload = JSON.parse(atob(tokens[1])); // Parse the token payload as JSON
    var userName = payload.username; // Extract the username from the payload
    console.log(userName);
    $.ajax({
        url: "http://localhost:8080/cart/remove/all?userName=" + userName,
        method: "DELETE",
        success: function (data) {
            sessionStorage.removeItem('cartPriceTotal');
            location.reload();
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

//////////////////////
// Price Update
//////////////////////
function updateCartTotal() {
    document.getElementById("total").innerHTML = sessionStorage.getItem('cartPriceTotal');
}

//////////////////////
// Get Product Quantity
//////////////////////

async function getProductQuantityForCart(product, callback){

    var userName = sessionStorage.getItem("usernameTokenCart");

    var authToken = sessionStorage.getItem("token");
    var tokens = authToken.split(".");
    var payload = JSON.parse(atob(tokens[1])); // Parse the token payload as JSON
    var userName = payload.username; // Extract the username from the payload

    var productId = product.productId;

    $.ajax({
        url: "http://localhost:8080/cart/cartitem-quantity/" + productId,
        method: "GET",
        data: {userName: userName},
        success: function (data) {
            var quantity = parseInt(data);
            if (!isNaN(quantity)) {
                callback(quantity);
            } else {
                console.error("Invalid quantity received from the server:", data.quantity);
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

