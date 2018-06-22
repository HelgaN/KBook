"use strict";

(function() {
  var addressInput = document.querySelector("#address");
  var mainPin = document.querySelector(".map__pin--main");
  var map = document.querySelector(".map");

  var limits = {
    topMin: 100,
    topMax: 600,
  };

  mainPin.addEventListener("mousedown", function(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.pageX - map.offsetLeft,
      y: evt.pageY
    }

    var adressY = mainPin.offsetHeight + mainPin.offsetTop;

    addressInput.value = "x: " + startCoords.x + ", y: " + adressY;

    var onMouseMove = function(evtMove) {
      evtMove.preventDefault();

      var shift = {
        x: evtMove.pageX,
        y: evtMove.pageY
      }

      if (shift.y > limits.topMax) {
        shift.y = limits.topMax;
      } else if (shift.y < limits.topMin) {
        shift.y = limits.topMin;
      }

      startCoords = {
        x: evt.pageX,
        y: evt.pageY
      }

      mainPin.style.top = shift.y + "px";
      mainPin.style.left = shift.x - map.offsetLeft + "px";
    }

    var onMouseUp = function(evtUp) {
      map.removeEventListener("mousemove", onMouseMove);
      map.removeEventListener("mouseup", onMouseUp);
    }

    map.addEventListener("mousemove", onMouseMove);
    map.addEventListener("mouseup", onMouseUp);

  })

  // Доработать! Соответствие координат острому концу метки

})();
