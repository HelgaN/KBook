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
    var valuePrice = searchValue(valuePrice, filterPricesOptions);
    var valueRoom = searchValue(valuePrice, filterRoomsOptions);
    var valueGuest = searchValue(valueGuest, filterGuestsOptions);




    console.log(valueHouse);
    console.log(valuePrice);
    console.log(valueRoom);
    console.log(valueGuest);




  });









})();
