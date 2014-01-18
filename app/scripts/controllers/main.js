'use strict';

angular.module('blacksunApp')
  .controller('MainPageCtrl', function ($scope, instagram, getInstgram, FBURL, $firebase){

    $scope.slides     = $firebase(new Firebase(FBURL+'/slider'));
    $scope.myInterval = 6000;
    $scope.highImage  = 'http://placekitten.com/200/300';
    $scope.instaModal = false;
  
    var imgWidth, imgHeight = 0;
    localStorage.loadUrl  = getInstgram.pagination.next_url;
    $scope.instagram_feed = instaMap(getInstgram);

    $scope.loadImages = function(){
      var loadUrl = localStorage.loadUrl;

      instagram.instaPagination(loadUrl).then(function(data){
        localStorage.loadUrl  = data.pagination.next_url;
        $scope.instagram_feed = _.union($scope.instagram_feed, instaMap(data));
        $('body').animate({ scrollTop: $('.sale-adds')[1].scrollHeight + 1430}, 1500);
      });
    };


    $scope.imgeModal = function(image){
      $scope.imgObj     = image;
      $scope.highImage  = image.imageHigh;
      $scope.likes      = image.likes;
      $scope.caption    = image.caption;
      $scope.instaModal = true;
    };

    $scope.closeInstaModal = function(){
      $scope.instaModal = false;
    };

    var countImg  = 0;
    var countImg2 = 0;

    $scope.nextImg = function(){
      countImg2 = 0;
      countImg  = countImg + 1;
      if($scope.imgIndex2){
        $scope.imgIndex = $scope.imgIndex2 + countImg;
      }else{
        $scope.imgIndex = _.indexOf($scope.instagram_feed, $scope.imgObj) + countImg;
      }
      
      console.log($scope.imgIndex);

      if($scope.imgIndex > $scope.instagram_feed.length - 1){
        $scope.instaModal = false; 
        countImg  = 0;
        countImg2 = 0;
      }

      _.each($scope.instagram_feed, function(data){
        if($scope.instagram_feed.indexOf(data) === $scope.imgIndex){
          $scope.highImage  = data.imageHigh;
          $scope.likes      = data.likes;
          $scope.caption    = data.caption;
        }
      });
    };

    $scope.prevImg = function(){
      countImg  = 0;
      countImg2 = countImg2 + 1;
      if($scope.imgIndex){
        $scope.imgIndex2 = $scope.imgIndex - countImg2;
      }else{
        $scope.imgIndex2 = _.indexOf($scope.instagram_feed, $scope.imgObj) - countImg2;
      }
      
      console.log($scope.imgIndex2);
      
      if($scope.imgIndex2 < 0){
        $scope.instaModal = false; 
        countImg  = 0;
        countImg2 = 0; 
      }

      _.each($scope.instagram_feed, function(data){
        if($scope.instagram_feed.indexOf(data) === $scope.imgIndex2){
          $scope.highImage  = data.imageHigh;
          $scope.likes      = data.likes;
          $scope.caption    = data.caption;
        }
      });
    };

    //functions
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
        var textiCap = '';
        if(data_instagram.caption != null){
          if(data_instagram.caption.text === undefined){
            textiCap = '#blackSunStore';
          }else{
            if(data_instagram.caption.text.length < 50){
              textiCap = data_instagram.caption.text;
            }else{
              var correctCar = data_instagram.caption.text.length - 47;
              var newCap     = data_instagram.caption.text;
              textiCap = newCap.substring(0, newCap.length - correctCar)+'...';
            }
          }
        }else{
          textiCap = '#blackSunStore';
        }

        var data_obj = {
          'link'      : data_instagram.link,
          'image'     : data_instagram.images.low_resolution.url,
          'imageHigh' : data_instagram.images.standard_resolution.url,
          'likes'     : data_instagram.likes.count,
          'caption'   : textiCap,
          'imgWidth'  : imgWidth,
          'imgHeight' : imgHeight
        };
        return data_obj;
      });
      return maping;
    }
});
