"use strict";

(function() {
  var similarListCards = document.querySelector(".map");
  var similarCardTemplate = document.querySelector("template").content.querySelector(".map__card");

  var renderCard = function(card) {
    var cardElement = similarCardTemplate.cloneNode("true");
    var cardTitle = cardElement.querySelector("h3").textContent = card.offer.title;
    var cardAddress = cardElement.querySelector("small").textContent = card.offer.address;
    var cardPrice = cardElement.querySelector(".popup__price").textContent = card.offer.price + "\u20bd" + "/ночь";
    var cardTypeOfHouse = cardElement.querySelector("h4");

    switch (card.offer.type) {
      case "flat":
        cardTypeOfHouse.textContent = "Квартира";
        break;
      case "house":
        cardTypeOfHouse.textContent = "Дом";
        break;
      case "bungalo":
        cardTypeOfHouse.textContent = "Бунгало";
        break;
      default:
        cardTypeOfHouse.textContent = "Неопознанная лачуга";
    }

    var cardRoomsAndGuests = cardElement.querySelector("h4 + p").textContent = card.offer.rooms + " комнаты для " + card.offer.guests + " гостей";
    var cardCheckinCheckoutTime = cardElement.querySelector("h4 + p + p").textContent = "Заезд после " + card.offer.checkin + ", выезд до" + card.offer.checkout;

    var features = cardElement.querySelectorAll(".feature");
    for (var i = 0; i < features.length; i++) {
      features[i].style.display = "none";
    }
    var featureWifi = cardElement.querySelector(".feature--wifi");
    var featureDishwasher = cardElement.querySelector(".feature--dishwasher");
    var featureParking = cardElement.querySelector(".feature--parking");
    var featureWasher = cardElement.querySelector(".feature--washer");
    var featureElevator = cardElement.querySelector(".feature--elevator");
    var featureConditioner = cardElement.querySelector(".feature--conditioner");

    for (var i = 0; i < card.offer.features.length; i++) {
      if (card.offer.features[i] == "wifi") {
        featureWifi.style.display = "inline-block";
      }
      if (card.offer.features[i] == "dishwasher") {
        featureDishwasher.style.display = "inline-block";
      }
      if (card.offer.features[i] == "parking") {
        featureParking.style.display = "inline-block";
      }
      if (card.offer.features[i] == "washer") {
        featureWasher.style.display = "inline-block";
      }
      if (card.offer.features[i] == "elevator") {
        featureElevator.style.display = "inline-block";
      }
      if (card.offer.features[i] == "conditioner") {
        featureConditioner.style.display = "inline-block";
      }
    }
    // описание апартаментов пока отсутствует
    var cardDescription = cardElement.querySelector(".popup__features + p").textContent = card.offer.description;
    var cardAvatar = cardElement.querySelector(".popup__avatar").src = card.author;

    return cardElement;
  }

  for (var i = 0; i < ads.length; i++) {
    similarListCards.appendChild(renderCard(ads[i])); // !!!! отприсовка всех окон объявлений
  }

  var popupCards = document.querySelectorAll(".popup"); // !! скрытие объяв
  for (var i = 0; i < popupCards.length; i++) {
    popupCards[i].style.display = "none";
  }

  var avatarsPopup = document.querySelectorAll(".popup > img");

  var onAddClassActive = function(node) {
    var selectedButton = node;
    if (selectedButton.classList.contains("map__pin--main")) return; // отмена добавления класса на метку для перетаскивания
    selectedButton.classList.add("map__pin--active");
    for (var i = 0; i < avatarsPopup.length; i++) { // привязка button к article (объявлению)
      avatarsPopup[i].parentNode.style.display = "none";
      if (avatarsPopup[i].src === selectedButton.firstElementChild.src) {
        avatarsPopup[i].parentNode.style.display = "block";
      }
    }
  }

  var onSearchButton = function(event) {
    var pins = document.querySelectorAll(".map__pin");

    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove("map__pin--active");
    }

    var target = event.target;
    // цикл двигается вверх от target к родителям до similarListPins
    while (target != this) {
      if (target.tagName.toLowerCase() == "button") {
        // нашли целевой элемент
        onAddClassActive(target);
        return;
      }
      target = target.parentNode;
    }
  }

  var similarListPins = document.querySelector(".map__pins");

  similarListPins.addEventListener("click", onSearchButton);

  var buttonElements = document.querySelectorAll(".popup__close");

  var closePopup = function(evt) {
    this.parentNode.style.display = "none";
    var pins = document.querySelectorAll(".map__pin"); // дублирование кода, можно доработать
    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove("map__pin--active");
    }
  }

  for (var i = 0; i < buttonElements.length; i++) {
    buttonElements[i].addEventListener("click", closePopup);
  }

  var closePopupEsc = function(event) {
    var pins = document.querySelectorAll(".map__pin");
    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove("map__pin--active");
    }
    for (var i = 0; i < popupCards.length; i++) {
      popupCards[i].style.display = "none";
    }
  }

  document.addEventListener("keydown", function(event) {
    if (event.keyCode == ESC_KEYCODE) {
      closePopupEsc();
    }
  });

})();
