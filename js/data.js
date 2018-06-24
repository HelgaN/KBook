"use strict";

var TITLES = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"].shuffle();
var IMGS = [1, 2, 3, 4, 5, 6, 7, 8].shuffle();
var TYPES = ["flat", "house", "bungalo"];
var TIMES = ["12:00", "13:00", "14:00"];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

var ads = [];
var numOfAds = 10;
var widthOfTheLabel = 40;
var heightOfTheLabel = 58;
/*
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
}*/


var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var URL = "https://js.dump.academy/keksobooking/data";
var similarListCards = document.querySelector(".map");
var mainPin = document.querySelector(".map__pin--main");
var similarListPins = document.querySelector(".map__pins");

var updateAds = function(data) {
  var ads = data;

  for (var i = 0; i < ads.length; i++) {
    ads[i] = {
      author: data[i].author.avatar,
      offer: {
        title: data[i].offer.title,
        address: undefined,
        price: data[i].offer.price,
        type: data[i].offer.type,
        rooms: data[i].offer.rooms,
        guests: data[i].offer.quests,
        checkin: data[i].offer.checkin,
        checkout: data[i].offer.checkout,
        features: data[i].offer.features,
        description: data[i].offer.description,
        photos: data[i].offer.photos
      },
      location: {
        x: data[i].location.x,
        y: data[i].location.y
      },
    };
    ads[i].offer.address = ads[i].location.x + ", " + ads[i].location.y;
  }
  return ads;
}

var successHandler = function(data) {
  var ads = data;
  updateAds(ads);
  for (var i = 0; i < ads.length; i++) {
    similarListCards.appendChild(renderCard(ads[i])); // !!!! отприсовка всех окон объявлений
  }
  var popupCards = document.querySelectorAll(".popup"); // !! скрытие объяв
  for (var i = 0; i < popupCards.length; i++) {
    popupCards[i].style.display = "none";
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

};

var errorHandler = function(errorMessage) {
  var node = document.createElement("div");
  node.style = "z-index: 100; margin: 0 auto; text-align: center; background-color: red;";
  node.style.left = "0";
  node.style.right = "0";
  node.style.fontSize = "30px;";

  node.textContent = errorMessage;

  document.body.insertAdjacentElement("afterbegin", node);
};
