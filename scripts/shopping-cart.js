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
                    // var priceForCart = product.price.toFixed(2);
                    // sessionStorage.setItem('priceForCart', priceForCart)
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

    data.cartItems.forEach(function (cartItem) {
        var product = cartItem.product;
        var row = "<tr>";
        row += "<td>" + product.productId + "</td>";
        row += "<td>" + product.productName + "</td>";
        row += "<td>" + product.description + "</td>";
        row += "<td>$" + product.price.toFixed(2) + "</td>";
        row += "<td>" + product.category.categoryId + "</td>";
        //row += "<td>" + product.quantity + "</td>";
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
                    console.log(userName);

                    var productId = product.productId;
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
            location.reload();
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });

}





//
// function updateCartTotal() {
//     //init
//     var total = 0;
//     var price = 0;
//     price = sessionStorage.getItem('priceForCart');
//
//     //add price to total
//     total += price;
//     //update total on website HTML
//     document.getElementById("total").innerHTML = total.toFixed(2);
//     //insert saved products to cart table
//     document.getElementById("carttable").innerHTML = carttable;
//     //update items in cart on website HTML
//     document.getElementById("itemsquantity").innerHTML = items;
// }


// //////////////////////
// // ANZEIGE LOGIK
// //////////////////////
//
// /* get cart total from session on load */
//
//
// updateCartTotal();
//
// /* button event listeners */
// document.getElementById("emptycart").addEventListener("click", emptyCart);
// var btns = document.getElementsByClassName('addtocart');
// for (var i = 0; i < btns.length; i++) {
//     btns[i].addEventListener('click', function() {addToCart(this);});
// }
//
// /* ADD TO CART functions */
//
// function addToCart(elem) {
//     //init
//     var sibs = [];
//     var getprice;
//     var getproductName;
//     var cart = [];
//     var stringCart;
//     //cycles siblings for product info near the add button
//     while(elem = elem.previousSibling) {
//         if (elem.nodeType === 3) continue; // text node
//         if(elem.className == "price"){
//             getprice = elem.innerText;
//         }
//         if (elem.className == "productname") {
//             getproductName = elem.innerText;
//         }
//         sibs.push(elem);
//     }
//     //create product object
//     var product = {
//         productname : getproductName,
//         price : getprice
//     };
//     //convert product data to JSON for storage
//     var stringProduct = JSON.stringify(product);
//     /*send product data to session storage */
//
//     if(!sessionStorage.getItem('cart')){
//         //append product JSON object to cart array
//         cart.push(stringProduct);
//         //cart to JSON
//         stringCart = JSON.stringify(cart);
//         //create session storage cart item
//         sessionStorage.setItem('cart', stringCart);
//         addedToCart(getproductName);
//         updateCartTotal();
//     }
//     else {
//         //get existing cart data from storage and convert back into array
//         cart = JSON.parse(sessionStorage.getItem('cart'));
//         //append new product JSON object
//         cart.push(stringProduct);
//         //cart back to JSON
//         stringCart = JSON.stringify(cart);
//         //overwrite cart data in sessionstorage
//         sessionStorage.setItem('cart', stringCart);
//         addedToCart(getproductName);
//         updateCartTotal();
//     }
// }
// /* Calculate Cart Total */
// function updateCartTotal(){
//     //init
//     var total = 0;
//     var price = 0;
//     var items = 0;
//     var productname = "";
//     var carttable = "";
//     if(sessionStorage.getItem('cart')) {
//         //get cart data & parse to array
//         var cart = JSON.parse(sessionStorage.getItem('cart'));
//         //get no of items in cart
//         items = cart.length;
//         //loop over cart array
//         for (var i = 0; i < items; i++){
//             //convert each JSON product in array back into object
//             var x = JSON.parse(cart[i]);
//             //get property value of price
//             price = parseFloat(x.price.split('$')[1]);
//             productname = x.productname;
//             //add price to total
//             carttable += "<tr><td>" + productname + "</td><td>$" + price.toFixed(2) + "</td></tr>";
//             total += price;
//         }
//
//     }
//     //update total on website HTML
//     document.getElementById("total").innerHTML = total.toFixed(2);
//     //insert saved products to cart table
//     document.getElementById("carttable").innerHTML = carttable;
//     //update items in cart on website HTML
//     document.getElementById("itemsquantity").innerHTML = items;
// }
// //user feedback on successful add
// function addedToCart(pname) {
//     var message = pname + " was added to the cart";
//     var alerts = document.getElementById("alerts");
//     alerts.innerHTML = message;
//     if(!alerts.classList.contains("message")){
//         alerts.classList.add("message");
//     }
// }
// /* User Manually empty cart */
// function emptyCart() {
//     //remove cart session storage object & refresh cart totals
//     if(sessionStorage.getItem('cart')){
//         sessionStorage.removeItem('cart');
//         updateCartTotal();
//         //clear message and remove class style
//         var alerts = document.getElementById("alerts");
//         alerts.innerHTML = "";
//         if(alerts.classList.contains("message")){
//             alerts.classList.remove("message");
//         }
//     }
//
// }