'use strict';

angular.module('blacksunApp', ['ngRoute','ngAnimate','ui.bootstrap','wu.masonry','firebase'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl : 'views/main.html',
        controller  : 'MainPageCtrl',
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
        templateUrl : 'views/shop.html'
      })
      .when('/mainPageAdmin', {
        templateUrl : 'views/mainPageAdmin.html',
        controller  : 'MainpageadminCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]).run(['$location','$rootScope','FBretrieves','FBURL','$window', function ($location, $rootScope, FBretrieves, FBURL, $window){
    
    var eBody =  angular.element($window.document.body);

    var routesAdminAuth = ['/mainPageAdmin'];
    var fb = new Firebase(FBURL);
    
    FBretrieves.retrieveEmails().then(function(data){
      $rootScope.emailsObj = data;
    });

    if(!localStorage.adminLoged || localStorage.adminLoged === undefined){
      localStorage.adminLoged = '';
    }

    $rootScope.$on('$routeChangeStart', function (event, next, current){
      
      eBody.css({'overflow':'hidden'});
      $rootScope.admin = true;
      fb.child('admin').once('value', function(snapShot){
        var admin     = snapShot.val();
        var nextRoute = next.$$route.originalPath;
        if(admin.adminPass != localStorage.adminLoged && _.contains(routesAdminAuth, nextRoute)){
          $location.path('/');
        }else{
          eBody.css({'overflow':'auto'});
          $rootScope.admin = false;
        }
      });
    });

  }]);
