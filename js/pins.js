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

  // определенно нужен рефакторинг, но пока так :)

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
    };

    var valueRoom = searchValue(valuePrice, filterRoomsOptions);
    var anyRoom = false;
    var oneRoom = false;
    var twoRoom = false;
    var threeRoom = false;
    if (valueRoom == "Любое число комнат") {
      anyRoom = true;
    } else if (valueRoom == "Одна комната") {
      oneRoom = true;
    } else if (valueRoom == "Две комнаты") {
      twoRoom = true;
    } else if (valueRoom == "Три комнаты") {
      threeRoom = true;
    };

    var valueGuest = searchValue(valueGuest, filterGuestsOptions);
    var anyGuest = false;
    var oneGuest = false;
    var twoGuest = false;

    if (valueGuest == "Любое число гостей") {
      anyGuest = true;
    } else if (valueGuest == "Один гость") {
      oneGuest = true;
    } else if (valueGuest == "Два гостя") {
      twoGuest = true;
    }

    var cardPopups = document.querySelectorAll(".map__card");
    var mapPins = document.querySelectorAll(".map__pin");
    var mass = [];
    var obj = [];
    var obj2 = [];
    var obj3 = [];
    var obj4 = [];
    var filterWifi = {};
    var filterDishwasher = {};
    var filterParking = {};
    var filterWasher = {};
    var filterElevator = {};
    var filterConditioner = {};

    cardPopups.forEach(function(item, i, arr) {
      var housePopup = cardPopups[i].querySelector("h4");
      mass.push(i);

      if (housePopup.textContent == valueHouse) {
        obj[mass[i]] = i;
      } else if (valueHouse == "Любой тип жилья") {
        obj[mass[i]] = i;
      } else {
        obj[mass[i]] = false;
      };

      var pricePopup = cardPopups[i].querySelector(".popup__price");
      pricePopup = parseInt(pricePopup.textContent);

      if (any) {
        obj2[mass[i]] = i;
      } else if (low && pricePopup < 10000) {
        obj2[mass[i]] = i;
      } else if (middle && (pricePopup > 10000 && pricePopup < 50000)) {
        obj2[mass[i]] = i;
      } else if (high && pricePopup > 50000) {
        obj2[mass[i]] = i;
      } else {
        obj2[mass[i]] = false;
      }

      var roomPopup = cardPopups[i].querySelector("h4 + p");
      roomPopup = parseInt(roomPopup.textContent);

      if (anyRoom) {
        obj3[mass[i]] = i;
      } else if (oneRoom && roomPopup == 1) {
        obj3[mass[i]] = i;
      } else if (twoRoom && roomPopup == 2) {
        obj3[mass[i]] = i;
      } else if (threeRoom && roomPopup == 3) {
        obj3[mass[i]] = i;
      } else {
        obj3[mass[i]] = false;
      }

      var guestPopup = cardPopups[i].querySelector("h4 + p");
      guestPopup = parseInt(guestPopup.textContent.slice(14));

      if (anyGuest) {
        obj4[mass[i]] = i;
      } else if (oneGuest && guestPopup == 1) {
        obj4[mass[i]] = i;
      } else if (twoGuest && guestPopup == 2) {
        obj4[mass[i]] = i;
      } else {
        obj4[mass[i]] = false;
      }

      var wifi = cardPopups[i].querySelector(".feature--wifi");

      var wifiValue = false;
      if(wifi.style.display != "none") {
        wifiValue = true;
      };

      var dishwasher = cardPopups[i].querySelector(".feature--dishwasher");
      var dishwasherValue = false;
      if(dishwasher.style.display != "none") {
        dishwasherValue = true;
      };

      var parking = cardPopups[i].querySelector(".feature--parking");
      var parkingValue = false;
      if(parking.style.display != "none") {
        parkingValue = true;
      };

      var washer = cardPopups[i].querySelector(".feature--washer");
      var washerValue = false;
      if(washer.style.display != "none") {
        washerValue = true;
      };

      var elevator = cardPopups[i].querySelector(".feature--elevator");
      var elevatorValue = false;
      if(elevator.style.display != "none") {
        elevatorValue = true;
      };

      var conditioner = cardPopups[i].querySelector(".feature--conditioner");
      var conditionerValue = false;
      if(conditioner.style.display != "none") {
        conditionerValue = true;
      };

      var formWifi = document.querySelector("#filter-wifi");
      var formDishwasher = document.querySelector("#filter-dishwasher");
      var formParking = document.querySelector("#filter-parking");
      var formWasher = document.querySelector("#filter-washer");
      var formElevator = document.querySelector("#filter-elevator");
      var formConditioner = document.querySelector("#filter-conditioner");

      if(formWifi.checked == wifiValue) {
        filterWifi[mass[i]] = i;
      } else {
        filterWifi[mass[i]] = false;
      }

      if(formDishwasher.checked == dishwasherValue) {
        filterDishwasher[mass[i]] = i;
      } else {
        filterDishwasher[mass[i]] = false;
      }

      if(formParking.checked == parkingValue) {
        filterParking[mass[i]] = i;
      } else {
        filterParking[mass[i]] = false;
      }

      if(formWasher.checked == washerValue) {
        filterWasher[mass[i]] = i;
      } else {
        filterWasher[mass[i]] = false;
      }

      if(formElevator.checked == elevatorValue) {
        filterElevator[mass[i]] = i;
      } else {
        filterElevator[mass[i]] = false;
      }

      if(formConditioner.checked == conditionerValue) {
        filterConditioner[mass[i]] = i;
      } else {
        filterConditioner[mass[i]] = false;
      }
    });

// num+1 как и i+1 из-за mainPin

    mapPins.forEach(function(pin, num, pinArr) {
      var index = obj[num];
      var index2 = obj2[num];
      var index3 = obj3[num];
      var index4 = obj4[num];
      var wifi = filterWifi[num];
      var dishwasher = filterDishwasher[num];
      var parking = filterParking[num];
      var washer = filterWasher[num];
      var elevator = filterElevator[num];
      var conditioner = filterConditioner[num];

      var formWifi = document.querySelector("#filter-wifi");
      var formDishwasher = document.querySelector("#filter-dishwasher");
      var formParking = document.querySelector("#filter-parking");
      var formWasher = document.querySelector("#filter-washer");
      var formElevator = document.querySelector("#filter-elevator");
      var formConditioner = document.querySelector("#filter-conditioner");

      if((num + 1) < mapPins.length) {
        if (index && index2 && index3 && index4) {
          mapPins[num + 1].style.display = "block";
          if(wifi && formWifi.checked || !formWifi.checked) {
            mapPins[num + 1].style.display = "block";
            if(dishwasher && formDishwasher.checked || !formDishwasher.checked) {
              mapPins[num + 1].style.display = "block";
              if(parking && formParking.checked || !formParking.checked) {
                mapPins[num + 1].style.display = "block";
                if(parking && formWasher.checked || !formWasher.checked) {
                  mapPins[num + 1].style.display = "block";
                  if(parking && formElevator.checked || !formElevator.checked) {
                    mapPins[num + 1].style.display = "block";
                    if(parking && formConditioner.checked || !formConditioner.checked) {
                      mapPins[num + 1].style.display = "block";
                    } else {
                      mapPins[num + 1].style.display = "none";
                    }
                  } else {
                    mapPins[num + 1].style.display = "none";
                  }
                } else {
                  mapPins[num + 1].style.display = "none";
                }
              } else {
                mapPins[num + 1].style.display = "none";
              }
            } else {
              mapPins[num + 1].style.display = "none";
            }
          } else {
            mapPins[num + 1].style.display = "none";
          }

        } else {
            mapPins[num + 1].style.display = "none";
          }
        }

    });

  });

})();
