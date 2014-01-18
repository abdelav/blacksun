'use strict';

angular.module('blacksunApp')
  .factory('FBretrieves', function(FBURL,$firebase,$q) {
  // Public API here
 	var fb = new Firebase(FBURL);
  
  return {
  	retrieveEmails : function(){
      var defer = $q.defer();
      var ref = fb.child('emails/');
      ref.once('value', function(data) {
        defer.resolve(data.val());
      });
      return defer.promise;
    },

    getSliderImg : function(){
      var defer = $q.defer();
      var ref = fb.child('slider/');
      ref.once('value', function(data) {
        defer.resolve(data.val());
      });
      return defer.promise;
    }
  };
});
