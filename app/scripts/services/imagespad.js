'use strict';

angular.module('blacksunApp')
  .factory('imagesPath', function(FBURL,$firebase,$q) {

    // Public API here
    return {
      saveImge : function (path, imgUrl, imgName){
        var images = $firebase(new Firebase(FBURL+'/'+path));
        var imageID = Math.random().toString(36).substr(2, 9);
        images.$add({
          url  : imgUrl,
          id   : imageID,
          name : imgName
        });
      }
    };
  });
