"use strict";

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

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
