"use strict";

/*map.classList.remove("map--faded");*/
/*similarListPins.appendChild(fragment);*/ // отрисовка объявлений после клика на mainPin

(function() {
  var mainPin = document.querySelector(".map__pin--main");
  var map = document.querySelector(".map");

  var onClickMapActivation = function() {
    map.classList.remove("map--faded");
  }

  mainPin.addEventListener("mouseup", onClickMapActivation);
})();
