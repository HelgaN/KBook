"use strict";

(function() {
    var mainPin = document.querySelector(".map__pin--main");
    var similarListPins = document.querySelector(".map__pins");
    var similarPinTemplate = document.querySelector("template").content.querySelector(".map__pin");

    var renderAd = function(ad) {
      var adElement = similarPinTemplate.cloneNode("true");
      var picItem = adElement.querySelector("img");
      adElement.style.left = ad.location.x + "px";
      adElement.style.top = ad.location.y + "px";
      picItem.src = ad.author;

      return adElement;
    }

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(renderAd(ads[i]));
    }

    window.onClickMainPinActivation = function() {
      similarListPins.appendChild(fragment); // отрисовка объявлений после клика на mainPin
    }

    mainPin.addEventListener("mouseup", onClickMainPinActivation);

    mainPin.addEventListener("keydown", function(event) {
      if (event.keyCode == ENTER_KEYCODE) {
        onClickMainPinActivation();
      }
    });
  }
)();
