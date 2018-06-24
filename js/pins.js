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
  /*
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < ads.length; i++) {
        fragment.appendChild(renderAd(ads[i]));
      }
  */
  var filter = document.querySelector(".map__filters");
  var cards = document.querySelectorAll(".map__card");
  var filterTypes = document.querySelectorAll("#housing-type option");

  var cardsImgs = document.querySelectorAll(".map__card img");
  var imgs = document.querySelectorAll(".map__pin img");

  filter.addEventListener("change", function() {
    var pins = document.querySelectorAll(".map__pin");
    pins.forEach(function(item, j, arr) {
      if(!pins[j].classList.contains("map__pin--main"))
      pins[j].style.display = "none";
    });

    filterTypes.forEach(function(item, i, arr) {
      if (filterTypes[i].selected) {
        var cardsTitles = document.querySelectorAll(".map__card h4");
        for (var k = 0; k < cardsTitles.length; k++) {
          if (filterTypes[i].innerText == "Сарай") {
            filterTypes[i].innerText = "Бунгало";
          }
          if (filterTypes[i].innerText == cardsTitles[k].innerText) {
            var length = cardsTitles[k].parentNode.classList.length;
            var className = cardsTitles[k].parentNode.classList[length - 1];
            console.log(className)
            var pins = document.querySelectorAll(".map__pin");
            pins.forEach(function(item, j, arr) {
              if (pins[j].classList.contains(className)) {
                pins[j].style.display = "block";
              }
            });
          };
        }

        if(filterTypes[i].value == "any") {
          var pins = document.querySelectorAll(".map__pin");
          pins.forEach(function(itemPin, numPin, arrPin) {
            pins[numPin].style.display = "block";
          });
        }

      }

    })



  })


})();
