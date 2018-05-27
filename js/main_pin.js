"use strict";

(function() {
  var limits = {
    topMin: 100,
    topMax: 500
  };

  var addressInput = document.querySelector("#address");
  var mainPin = document.querySelector(".map__pin--main");
  var map = document.querySelector(".map");

  console.log(limits);

  mainPin.addEventListener("mousedown", function(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    }

    addressInput.value = "x: " + startCoords.x + ", y: " + startCoords.y;

    console.log(startCoords);

    var onMouseMove = function(evtMove) {
      evtMove.preventDefault();
      var shift = {
        x: evtMove.pageX,
        y: evtMove.pageY
      }

      if (shift.y > limits.topMax) {
        shift.y = limits.bottom;
      } else if (shift.y < limits.topMin) {
        shift.y = limits.topMin;
      }

      startCoords = {
        x: evtMove.pageX,
        y: evtMove.pageY
      }

      mainPin.style.top = shift.y + "px";
      mainPin.style.left = shift.x + "px";
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
