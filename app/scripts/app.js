'use strict';

angular.module('blacksunApp', ['ngRoute','ui.bootstrap','wu.masonry'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          getInstgram : function(instagram, $q) {
            var defer = $q.defer();
            instagram.getInstaStream().then(function(data){
              return defer.resolve(data);
            });
            return defer.promise;
          }
        }
      })
      .when('/shop', {
        templateUrl: 'views/shop.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
