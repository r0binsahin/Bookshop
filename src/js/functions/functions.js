"use strict";
// Funktion för att skriva ut produkter/lista
exports.__esModule = true;
exports.handleCLick = exports.showProducts = void 0;
var data_1 = require("../services.ts/data");
var showProducts = function (products) {
    var container = document.getElementById("productpageWrapper");
    var _loop_1 = function (i) {
        var bookContainer = document.createElement("div");
        var title = document.createElement("h3");
        var img = document.createElement("img");
        var type = document.createElement("p");
        var price = document.createElement("p");
        var button = document.createElement("button");
        button.innerHTML = "Buy";
        button.addEventListener("click", function () {
            (0, exports.handleCLick)(products[i]);
        });
        bookContainer.classList.add(products[i].type);
        title.innerHTML = products[i].title;
        img.src = products[i].img;
        type.innerHTML = products[i].type;
        price.innerHTML = JSON.stringify(products[i].prize);
        bookContainer.appendChild(title);
        bookContainer.appendChild(img);
        bookContainer.appendChild(type);
        bookContainer.appendChild(price);
        bookContainer.appendChild(button);
        container.appendChild(bookContainer);
    };
    for (var i = 0; i < products.length; i++) {
        _loop_1(i);
    }
};
exports.showProducts = showProducts;
//Hantera klick/köp
var handleCLick = function (product) {
    data_1.selectedItems.push(product);
    localStorage.setItem("storageList", JSON.stringify(data_1.selectedItems));
    console.log(data_1.selectedItems);
    var sum = calcPrice(data_1.selectedItems);
    console.log(sum);
    return sum;
};
exports.handleCLick = handleCLick;
//Kalkylera totalsumman
var calcPrice = function (selectedItems) {
    var sum = 0;
    for (var i = 0; i < selectedItems.length; i++) {
        sum += selectedItems[i].prize;
    }
    return sum;
};
