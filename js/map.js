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
        x: getRandomArbitrary(300, 900).toFixed(0),
        y: getRandomArbitrary(100, 500).toFixed(0)
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

var similarListElement = document.querySelector(".map__pins");
var similarItemTemplate = document.querySelector("template").content.querySelector(".map__pin");
var picItem = similarItemTemplate.querySelector("img");

var renderAd = function(ads) {
  var adElement = similarItemTemplate.cloneNode("true");
  picItem.src = ads.author;
  adElement.style.left = ads.location.x - 20 + "px";
  adElement.style.top = ads.location.y - 20 + "px";

  return adElement;
}

var fragment = document.createDocumentFragment();

for(var i = 0; i < ads.length; i++) {
  fragment.appendChild(renderAd(ads[i]));
}

similarListElement.appendChild(fragment);
