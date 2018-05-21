"use strict";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

Array.prototype.shuffle = function(b) {
  var i = this.length,
    j, t;
  while (i) {
    j = Math.floor((i--) * Math.random());
    t = b && typeof this[i].shuffle !== 'undefined' ? this[i].shuffle() : this[i];
    this[i] = this[j];
    this[j] = t;
  }
  return this;
};

var TITLES = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"].shuffle();
var IMGS = [1, 2, 3, 4, 5, 6, 7, 8].shuffle();
var TYPES = ["flat", "house", "bungalo"];
var TIMES = ["12:00", "13:00", "14:00"];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

var ads = [];
var numOfAds = 8;
var widthOfTheLabel = 40;
var heightOfTheLabel = 58;

for (var i = 0; i < numOfAds; i++) {
  ads[i] = {
    author: "img/avatars/user0" + IMGS[i] + ".png",
    offer: {
      title: TITLES[i],
      address: undefined,
      price: getRandomArbitrary(1000, 1000000).toFixed(0),
      type: TYPES[getRandomArbitrary(0, 2).toFixed(0)],
      rooms: getRandomArbitrary(1, 5).toFixed(0),
      guests: getRandomArbitrary(1, 10).toFixed(0),
      checkin: TIMES[getRandomArbitrary(0, 2).toFixed(0)],
      checkout: TIMES[getRandomArbitrary(0, 2).toFixed(0)],
      features: [],
      description: "",
      photos: []
    },
    location: {
      x: Number(getRandomArbitrary(300, 900).toFixed(0)) + widthOfTheLabel / 2,
      y: Number(getRandomArbitrary(100, 500).toFixed(0)) + Number(heightOfTheLabel)
    },
  };
  ads[i].offer.address = ads[i].location.x + ", " + ads[i].location.y;
  ads[i].offer.features.length = getRandomArbitrary(1, 6).toFixed(0);
  FEATURES.shuffle();
  for (var j = 0; j < ads[i].offer.features.length; j++) {
    ads[i].offer.features[j] = FEATURES[j];
  }
}

console.log(ads);

var map = document.querySelector(".map");
/*map.classList.remove("map--faded");*/

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

/*similarListPins.appendChild(fragment);*/ // отрисовка объявлений после клика на mainPin

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

var form = document.querySelector(".notice__form");
form.classList.add("notice__form--disabled");

var mainPin = document.querySelector(".map__pin--main");
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var onClickMainPinActivation = function() {
  similarListCards.classList.remove("map--faded");
  similarListPins.appendChild(fragment); // отрисовка объявлений после клика на mainPin
  form.classList.remove("notice__form--disabled");
  var fieldsets = form.querySelectorAll("fieldset");
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = false;
  }
}

mainPin.addEventListener("mouseup", onClickMainPinActivation);

mainPin.addEventListener("keydown", function(event) {
  if (event.keyCode == ENTER_KEYCODE) {
    onClickMainPinActivation();
  }
});

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
    if (target.tagName == "BUTTON") {
      // нашли целевой элемент
      onAddClassActive(target);
      return;
    }
    target = target.parentNode;
  }
}

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
