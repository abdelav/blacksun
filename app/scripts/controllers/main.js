'use strict';

angular.module('blacksunApp')
  .controller('MainCtrl', function ($scope, instagram, getInstgram) {
    
    $scope.myInterval = 5000;
    
    var slides = $scope.slides = [];
    
    $scope.addSlide = function() {
      //var newWidth = 200 + ((slides.length + (25 * slides.length)) % 150);
      slides.push({
        image: 'http://placekitten.com/1000/400',
        text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
              ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
      });
    };
    
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }

    var imgWidth, imgHeight = 0;
    console.log(getInstgram);
    localStorage.loadUrl  = getInstgram.pagination.next_url;
    $scope.instagram_feed = instaMap(getInstgram);

    $scope.loadImages = function(){
      var loadUrl = localStorage.loadUrl;

      instagram.instaPagination(loadUrl).then(function(data){
        localStorage.loadUrl = data.pagination.next_url;
        $scope.instagram_feed = _.union($scope.instagram_feed, instaMap(data));
      });
      console.log($('.sale-adds'));
      $('body').animate({ scrollTop: $('.sale-adds')[1].scrollHeight + 1430}, 1500);
    }

    function instaMap(mapMe){
      var imgsCounter = 2;
      var maping      = _.map(mapMe.data, function(data_instagram){
        if(mapMe.data.indexOf(data_instagram) === imgsCounter){
          imgWidth    = 376;
          imgHeight   = 376;
          imgsCounter = 6;
        }else{
          imgWidth  = 188;
          imgHeight = 188;
        }
        var data_obj = {
          'link'      : data_instagram.link,
          'image'     : data_instagram.images.low_resolution.url,
          'imageHigh' : data_instagram.images.standard_resolution.url,
          'imgWidth'  : imgWidth,
          'imgHeight' : imgHeight
        };
        return data_obj;
      });
      return maping;
    }
});
