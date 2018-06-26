"use strict";

(function() {
  var mainPin = document.querySelector(".map__pin--main");
  var similarListPins = document.querySelector(".map__pins");
  var similarPinTemplate = document.querySelector("template").content.querySelector(".map__pin");

  window.renderAd = function(ad) {
    var adElement = similarPinTemplate.cloneNode("true");
    var picItem = adElement.querySelector("img");
    adElement.style.left = ad.location.x + "px";
    adElement.style.top = ad.location.y + "px";
    picItem.src = ad.author;

    return adElement;
  }

  var formFilter = document.querySelector(".map__filters");
  var filterHouses = document.querySelector("#housing-type");
  var filterHousesOptions = document.querySelectorAll("#housing-type option");
  var filterPrices = document.querySelector("#housing-price");
  var filterPricesOptions = document.querySelectorAll("#housing-price option");
  var filterRooms = document.querySelector("#housing-rooms");
  var filterRoomsOptions = document.querySelectorAll("#housing-rooms option");
  var filterGuests = document.querySelector("#housing-guests");
  var filterGuestsOptions = document.querySelectorAll("#housing-guests option");
  var filterFuaters = document.querySelector("#housing-features");
  var filterFuatersInputs = document.querySelectorAll("#housing-features inputs");


  var searchValue = function(value, arr) {
    arr.forEach(function(item, i, arr) {
      if (arr[i].selected) {
        var valueSelect = arr[i].text;
        value = valueSelect;
        return value;
      }
    });
    return value;
  }

  formFilter.addEventListener("change", function() {

    var valueHouse = searchValue(valueHouse, filterHousesOptions);
    if (valueHouse == "Сарай") {
      valueHouse = "Бунгало";
    }
    var valuePrice = searchValue(valuePrice, filterPricesOptions);
    var any = false;
    var middle = false;
    var low = false;
    var high = false;
    if (valuePrice == "Любая") {
      any = true;
    } else if (valuePrice == "10000 - 50000₽") {
      middle = true;
    } else if (valuePrice == "до 10000₽") {
      low = true;
    } else if (valuePrice == "от 50000₽") {
      high = true;
    }
    var valueRoom = searchValue(valuePrice, filterRoomsOptions);
    var valueGuest = searchValue(valueGuest, filterGuestsOptions);
    console.log(valueHouse);
    console.log(valuePrice);
    console.log(valueRoom);
    console.log(valueGuest);
    var cardPopups = document.querySelectorAll(".map__card");
    var mapPins = document.querySelectorAll(".map__pin");
    var mass = [];
    var obj = [];
    var obj2 = [];
    console.log(obj)

    cardPopups.forEach(function(item, i, arr) {
      var housePopup = cardPopups[i].querySelector("h4");
      mass.push(i);

      if (housePopup.textContent == valueHouse) {
        /*mapPins[i+1].style.display = "block";*/
        mapPins[i + 1].style.border = "5px solid blue";
        obj[mass[i]] = i;
      } else if (valueHouse == "Любой тип жилья") {
        /*mapPins[i+1].style.display = "block";*/
        mapPins[i + 1].style.border = "5px solid blue";
        obj[mass[i]] = i;
      } else {
        /*mapPins[i+1].style.display = "none";*/
        mapPins[i + 1].style.border = "5px solid red";
        obj[mass[i]] = false;
      };


      var pricePopup = cardPopups[i].querySelector(".popup__price");
      pricePopup = parseInt(pricePopup.textContent);

      if (any) {
        /*  mapPins[i+1].style.display = "block";*/
        mapPins[i + 1].style.border = "5px solid blue";
        obj2[mass[i]] = i;
      } else if (low && pricePopup < 10000) {
        /*  mapPins[i+1].style.display = "block";*/
        mapPins[i + 1].style.border = "5px solid blue";
        obj2[mass[i]] = i;
      } else if (middle && (pricePopup > 10000 && pricePopup < 50000)) {
        /*  mapPins[i+1].style.display = "block";*/
        mapPins[i + 1].style.border = "5px solid blue";
        obj2[mass[i]] = i;
      } else if (high && pricePopup > 50000) {
        /*  mapPins[i+1].style.display = "block";*/
        mapPins[i + 1].style.border = "5px solid blue";
        obj2[mass[i]] = i;
      } else {
        /*  mapPins[i+1].style.display = "none";*/
        mapPins[i + 1].style.border = "5px solid red";
        obj2[mass[i]] = false;
      }

    });


    var mapPins = document.querySelectorAll(".map__pin");

// num+1 как и i+1 из-за mainPin

    mapPins.forEach(function(pin, num, pinArr) {
      var index = obj[num];
      var index2 = obj2[num];
      if((num + 1) < mapPins.length) {
        if (index && index2) {
          mapPins[num + 1].style.display = "block";
        } else {
            mapPins[num + 1].style.display = "none";
          }
        }

    });








  });









})();
