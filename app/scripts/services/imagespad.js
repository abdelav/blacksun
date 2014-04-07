'use strict';

angular.module('blacksunApp')
  .factory('imagesPath', function(FBURL,$firebase,$q) {

    // Public API here
    return {
      saveImge : function (path, imgUrl, imgName, urlRef){
        var images  = $firebase(new Firebase(FBURL+'/'+path));
        var imageID = Math.random().toString(36).substr(2, 9);
        var target  = '_blank'; 
        if(urlRef === ''){
          urlRef = '#/';
          target = '_self';
        }

        images.$add({
          url   : imgUrl,
          id    : imageID,
          name  : imgName,
          ref   : urlRef,
          tar   : target
        });
      }
    };
  });
