"use strict";

(function () {
  var form = document.querySelector(".notice__form");
  var mainPin = document.querySelector(".map__pin--main");
  form.classList.add("notice__form--disabled");

  var onClickMainCardsActivation = function() {
    form.classList.remove("notice__form--disabled");
    var fieldsets = form.querySelectorAll("fieldset");
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
  }

  mainPin.addEventListener("mouseup", onClickMainCardsActivation);

  var titleInput = document.querySelector("#title");

  titleInput.addEventListener("invalid", function() {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity("Заголовок должен состоять минимум из 30 символов");
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity("Максимально допустимая длина заголовка - 100 символов");
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity("Поле \"Заголовок объявления\" является обязательным для заполнения");
    } else {
      titleInput.setCustomValidity(" ");
    };
  });

  var priceInput = document.querySelector("#price");

  var timeinInput = document.querySelector("#timein");
  var timeoutInput = document.querySelector("#timeout");

  timeinInput.addEventListener("change", function() {
    timeoutInput.selectedIndex = this.selectedIndex;
  });

  timeoutInput.addEventListener("change", function() {
    timeinInput.selectedIndex = this.selectedIndex;
  });

  var typeInput = document.querySelector("#type");

  var onSearchMinPrice = function() {
    for (var i = 0; i < typeInput.options.length; i++) {
      var option = typeInput.options[i];
      if (option.selected && option.text == "Лачуга") {
        priceInput.setAttribute("min", 0);
      } else if (option.selected && option.text == "Квартира") {
        priceInput.setAttribute("min", 1000);
      } else if (option.selected && option.text == "Дом") {
        priceInput.setAttribute("min", 5000);
      } else if (option.selected && option.text == "Дворец") {
        priceInput.setAttribute("min", 10000);
      }
    }
  }

  typeInput.addEventListener("change", onSearchMinPrice);
  onSearchMinPrice();

  priceInput.addEventListener("invalid", function() {
    var minPrice = priceInput.getAttribute("min");
    if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity("Это уже слишком! Максимально допустимая цена за ночь - 1000000 рублей");
    } else if (priceInput.validity.rangeUnderflow) {
      if (minPrice == 1000) {
        priceInput.setCustomValidity("Маловато... Хотя бы 1000 рублей за ночь");
      } else if (minPrice == 5000) {
        priceInput.setCustomValidity("Маловато... Хотя бы 5000 рублей за ночь");
      } else if (minPrice == 10000) {
        priceInput.setCustomValidity("Маловато... Хотя бы 10000 рублей за ночь");
      } /*  priceInput.setCustomValidity("Маловато... Хотя бы 100 рублей за ночь");*/
    } else if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity("Поле \"Цена за ночь\" является обязательным для заполнения");
    } else {
      priceInput.setCustomValidity(" ");
    }
  });

  var roomNumberInput = document.querySelector("#room_number");
  var capacityInput = document.querySelector("#capacity");

  var onSearchCapacity = function() {
    for (var i = 0; i < roomNumberInput.options.length; i++) {
      var optionRoom = roomNumberInput.options[i];
      var optionCapacity1 = capacityInput.options[0];
      var optionCapacity2 = capacityInput.options[1];
      var optionCapacity3 = capacityInput.options[2];
      var optionCapacity4 = capacityInput.options[3];

      if (optionRoom.selected && optionRoom.value == "1") {
        optionCapacity1.style.display = "none";
        optionCapacity2.style.display = "none";
        optionCapacity3.style.display = "block";
        optionCapacity3.selected = true;
        optionCapacity4.style.display = "none";
      } else if (optionRoom.selected && optionRoom.value == "2") {
        optionCapacity1.style.display = "none";
        optionCapacity2.style.display = "block";
        optionCapacity2.selected = true;
        optionCapacity3.style.display = "block";
        optionCapacity4.style.display = "none";
      } else if (optionRoom.selected && optionRoom.value == "3") {
        optionCapacity1.style.display = "block";
        optionCapacity1.selected = true;
        optionCapacity2.style.display = "block";
        optionCapacity4.style.display = "none";
        optionCapacity3.style.display = "block";
      } else if (optionRoom.selected && optionRoom.value == "100") {
        optionCapacity1.style.display = "none";
        optionCapacity2.style.display = "none";
        optionCapacity3.style.display = "none";
        optionCapacity4.style.display = "block";
        optionCapacity4.selected = true;
      }
    }
  }

  onSearchCapacity();

  roomNumberInput.addEventListener("change", onSearchCapacity);
/*
  form.addEventListener("click", function(evt) {
    var elems = document.querySelectorAll("input[required]");
    for (var i = 0; i < elems.length; i++) {
      if (elems[i].validity.valid == false) {
        evt.preventDefault();
        elems[i].style.outline = "3px solid red";
      } else {
        elems[i].style.outline = "none";
      }
    }
  });              // здесь доработать + отправка без перезагрузки
*/
})();
