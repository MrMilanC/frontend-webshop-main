import products from '/products.json' assert {type: 'json'};

const cardWrapper = document.querySelector(".appendDiv");

const details = products.map((item, index) => {
    return (` <div class="col">
    <div class="card-body">
      <img src=${item.image} class="card-img-top object-fit w-100" style="width:250px; height:150px" alt="...">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">${item.description}</p>
      <a href="#" class="btn btn-primary" data-index="${index}">Anzeigen</a>
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
const anzeigenButtons = document.querySelectorAll(".btn.btn-primary");
anzeigenButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const index = event.target.getAttribute("data-index");
        const selectedProduct = products[index];
        const categoryId = selectedProduct.categoryId;
        console.log("prvo " + categoryId);

        $(document).ready(function () {
            //var categoryToken = sessionStorage.getItem("categoryId");
            $.ajax({
                url: "http://localhost:8080/products/view/category/" + categoryId,
                method: "GET",
                dataType: "json",
                success: console.log("drugo " + categoryId),
                error: function (xhr, status, error) {
                    console.error(error);
                }
            });

        });

        // Call filter function here with the selectedProduct data
        //filterFunction(selectedProduct);
    });
});



//ALT ANFANG
// import products from '/products.json' assert {type: 'json'};
//
// const cardWrapper = document.querySelector(".appendDiv");
//
// const details = products.map((item, index) => {
//     return (` <div class="col">
//     <div class="card-body">
//       <img src=${item.image} class="card-img-top object-fit w-100" style="width:250px; height:150px" alt="...">
//       <h5 class="card-title">${item.title}</h5>
//       <p class="card-text">${item.description}</p>
//       <a href="#" class="btn btn-primary" data-index="${index}">Anzeigen</a>
//     </div>
//   </div>`
//     )
// });
//
// for (let i = 0; i < products.length; i++) {
//     let cardBox = document.createElement("div");
//     cardBox.classList.add("card");
//     cardBox.classList.add("cardWrapper");
//     cardBox.innerHTML = details[i];
//     cardWrapper.append(cardBox);
// }
//ALT ENDE

// // Adds event listener to all "Anzeigen" buttons
// const anzeigenButtons = document.querySelectorAll(".btn.btn-primary");
// anzeigenButtons.forEach((button) => {
//     button.addEventListener("click", function (event) {
//         event.preventDefault();
//         const index = event.target.getAttribute("data-index");
//         const selectedProduct = products[index];
//         const categoryId = selectedProduct.categoryId;
//         console.log("prvo " + categoryId);
//
//         $(document).ready(function () {
//             //var categoryToken = sessionStorage.getItem("categoryId");
//             $.ajax({
//                 url: "http://localhost:8080/products/view/category/" + categoryId,
//                 method: "GET",
//                 dataType: "json",
//                 success: function (data) {
//                     displayProductsCategory(data)
//                 },
//                 error: function (xhr, status, error) {
//                     console.error(error);
//                 }
//             });
//
//         });
//
//         // Call filter function here with the selectedProduct data
//         //filterFunction(selectedProduct);
//     });
// });

// function filterFunction(selectedProduct) {
//     // Modify this function to perform desired filtering operation
//     // You can access the selected product's data via the selectedProduct parameter
//     console.log("Selected Product:", selectedProduct);
// }


//////////////////////////////////// BIRANA KATEGORIJA

// function displayProductsCategory(data) {
//     var productTableBodyHome = $("#productTableBodyHome");
//     productTableBodyHome.empty(); // Clear existing rows
//
//     data.forEach(function (product) {
//         var row = "<tr>";
//         row += "<td>" + product.productId + "</td>";
//         row += "<td>" + product.productName + "</td>";
//         row += "<td>" + product.description + "</td>";
//         row += "<td>$" + product.price.toFixed(2) + "</td>";
//         row += "<td>" + product.category + "</td>";
//         row += "<td>" + product.quantity + "</td>";
//         row += '<td><img src="/static/img/' + product.imageName + '" height="100px" width="100px" style="border:5px solid black"></td>';
//         row += "</tr>";
//         var showProduct = $('<td>').append(
//             $('<a>').attr('href', '#' + product.id)
//                 .addClass('btn btn-success')
//                 .text('Show')
//                 .click(function (e) {
//                     e.preventDefault();
//                     var productId = product.productId;
//                     $.ajax({
//                         url: "http://localhost:8080/admin/products/view/" + productId,
//                         method: "GET",
//                         dataType: "json",
//                         success: function (data) {
//                             console.log("Show product", data);
//                             sessionStorage.setItem('productId', productId);
//                             window.location.href = "product-detail.html";
//                         },
//                         error: function (xhr, status, error) {
//                             console.error(error);
//                         }
//                     });
//                 })
//         );
//
//         productTableBodyHome.append(row, showProduct);
//     });
// }


