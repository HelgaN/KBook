"use strict";

(function() {
    var IMG_TYPES = ["jpg", "jpeg", "gif", "png"];
    var imageAvatar = document.querySelector(".upload input[type=file]");
    var imageHouse = document.querySelector(".form__photo-container input[type=file]");
    var imageAvatarPreview = document.querySelector(".notice__preview img");
    var imageHousePreview = document.querySelector(".form__photo-container");

    var addImage = function(input, img) {
      var file = input.files[0];
      if (file) {
        var fileName = file.name.toLowerCase();

        var fileTypeCheck = IMG_TYPES.some(function(it) {
          return fileName.endsWith(it);
        });

        if (fileTypeCheck) {
          var reader = new FileReader();

          reader.addEventListener("load", function() {
            img.src = reader.result;
          });
          reader.readAsDataURL(file);
        };
      };
    };

    imageAvatar.addEventListener("change", function() {
      addImage(imageAvatar, imageAvatarPreview);
    });

    imageHouse.addEventListener("change", function() {
      var newImg = document.createElement("img");
      imageHousePreview.appendChild(newImg);
      var imageHousePreviewNewEl = document.querySelector(".form__photo-container img:last-child");
      addImage(imageHouse, imageHousePreviewNewEl);
    });

    })();
