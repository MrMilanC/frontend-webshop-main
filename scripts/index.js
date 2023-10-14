import products from '/products.json' assert {type: 'json'};

const cardWrapper = document.querySelector(".appendDiv");

const details = products.map((item, index) => {
    return (` <div class="col">
    <div class="card-body">
      <img src=${item.image} class="card-img-top object-fit w-100" style="width:250px; height:150px" alt="...">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">${item.description}</p>
      <a href="#" class="btn btn-success" data-index="${index}">Anzeigen</a>
    </div>
  </div>`
    )
});

for (let i = 0; i < products.length; i++) {
    let cardBox = document.createElement("div");
    cardBox.classList.add("card");
    cardBox.classList.add("cardWrapper");
    cardBox.innerHTML = details[i];
    cardWrapper.append(cardBox);
}

// Adds event listener to all "Anzeigen" buttons
const anzeigenButtons = document.querySelectorAll(".btn.btn-success");
anzeigenButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const index = event.target.getAttribute("data-index");
        const selectedProduct = products[index];

        const categoryId = selectedProduct.categoryId;
        sessionStorage.setItem('categoryId', categoryId);

        $(document).ready(function () {
            $.ajax({
                url: "http://localhost:8080/products/view",
                method: "GET",
                dataType: "json",
                success: function (data) {
                    displayProductsByCategory(data)
                },
                error: function (xhr, status, error) {
                    console.error(error);
                }
            });
        });
    });
});

function displayProductsByCategory(data) {
    console.log(data)
    var productTableBodyIndex = $("#productTableBodyIndex");
    productTableBodyIndex.empty(); // Clear existing rows

    var categoryToken = parseInt(sessionStorage.getItem("categoryId"));

    data.forEach(function (product) {
        var categoryCompare = product.category.categoryId;
        //var categoryCompare = product.category.categoryId.toString();

        if (categoryCompare === categoryToken) { // Check if the product belongs to the desired category

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
            productTableBodyIndex.append(row, showProduct);
        }
    });
}



