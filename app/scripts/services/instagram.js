'use strict';

angular.module('blacksunApp')
  .factory('instagram', function($q, $http) {
    
    var access_token = '220451675.1fb234f.36e1b4878a8e4f34859b7a46c71736d8';
    var userId       = '220451675';
    var urlInstagram = 'https://api.instagram.com/v1/users/'+userId+'/media/recent/?access_token='+access_token+'&count=14&callback=JSON_CALLBACK';

    // Public API here
    return {
      
      getInstaStream : function(){
        var defer = $q.defer();
        $http.jsonp(urlInstagram).success(function(data){
          defer.resolve(data);
        });
        return defer.promise;
      },

      instaPagination : function(url){
        var callback = url.substring(0, url.length - 20) + 'JSON_CALLBACK';
        var defer = $q.defer();
        $http.jsonp(callback).success(function(data){
          defer.resolve(data);
        });
        return defer.promise;
      }
    };
  });
