"use strict";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

Array.prototype.shuffle = function(b) {
  var i = this.length, j, t;
  while(i) {
   j = Math.floor( ( i-- ) * Math.random() );
   t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
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

for(var i = 0; i < numOfAds; i++) {
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
        x: Number(getRandomArbitrary(300, 900).toFixed(0)) + widthOfTheLabel/2,
        y: Number(getRandomArbitrary(100, 500).toFixed(0)) + Number(heightOfTheLabel)
      },
    };
  ads[i].offer.address = ads[i].location.x + ", " + ads[i].location.y;
  ads[i].offer.features.length = getRandomArbitrary(1, 6).toFixed(0);
  FEATURES.shuffle();
    for(var j = 0; j < ads[i].offer.features.length; j++) {
      ads[i].offer.features[j] = FEATURES[j];
    }
}

console.log(ads);

var map = document.querySelector(".map");
map.classList.remove("map--faded");

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

for(var i = 0; i < ads.length; i++) {
  fragment.appendChild(renderAd(ads[i]));
}

similarListPins.appendChild(fragment);

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

  for(var i = 0; i < card.offer.features.length; i++) {
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

similarListCards.appendChild(renderCard(ads[0]));
