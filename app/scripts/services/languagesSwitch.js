'use strict';

angular.module('blacksunApp')
  .factory('languagesSwitch', function ($http,$q) {
    
    return {
      getLanguages : function(lang){
        var deferred = $q.defer();
        $http.get('scripts/i18n/lang_'+lang+'.json').success(function(data){
          deferred.resolve(data);
        }).error(function(){
          deferred.reject();
        });
        return deferred.promise;
      }
    };
  });
