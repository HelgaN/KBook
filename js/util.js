"use strict";

(function() {
  window.getRandomArbitrary = function (min, max) {
    return Math.random() * (max - min) + min;
  }

  window.Array.prototype.shuffle = function(b) {
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
}

)();
