"use strict";

(function() {
  window.load = function(data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.open("GET", URL);

    xhr.addEventListener("load", function() {
      if (xhr.status === 200) {
        successHandler(xhr.response);
      } else {
        onError("неизвестный статус" + xhr.status + " " + xhr.statusText);
      };
    });

    xhr.addEventListener("error", function() {
      onError("произошла ошибка соединения");
    });

    xhr.addEventListener("timeout", function() {
      onError("запрос не успел выполниться за " + xhr.timeout + " мс");
    });

    xhr.timeout = 10000;    //10s

    xhr.send();
  };

  window.load(successHandler, errorHandler);

})();
