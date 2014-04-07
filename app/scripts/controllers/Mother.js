'use strict';

angular.module('blacksunApp')
  .controller('MotherCtrl', function($scope, $rootScope, FBURL, $firebase, $location, languagesSwitch) {
    
  $scope.obj = [];
    
  $scope.showEmailInput = true;
  $scope.repeatEmail    = false;
  $scope.i18n           = {};
  //set english as default language
  var countryCode = 'US';
  var langList    = ['US', 'ES'];
  var userLang    = navigator.language || navigator.userLanguage;
  var upperLang   = userLang.toUpperCase();

  if(upperLang != 'US'){
    if(_.contains(langList, upperLang)){
      countryCode = upperLang;
    }
    languagesSwitch.getLanguages(countryCode).then(function(data){       
      $scope.i18n = data[countryCode];       
    });
  }else{
    languagesSwitch.getLanguages(countryCode).then(function(data){       
      $scope.i18n = data[countryCode];        
    });
  }
    
  $scope.emails = $firebase(new Firebase(FBURL+'/emails'));

  var fb = new Firebase(FBURL);

  $scope.submitEmail = function(){
    var emailList = _.pluck($rootScope.emailsObj, 'email');
    if(_.contains(emailList, $scope.obj.email)){
    	$scope.repeatEmail = true;
    }else{
    	$scope.emails.$add({email:$scope.obj.email});	
    	$scope.showEmailInput = false;
    	$scope.repeatEmail    = false;
    }
  }

  $scope.openModal = function(){
    $scope.modal.show = true;
  };

  $scope.modal = {
      show  : false,
      data:{
        obj:{},
        options: {},
      },
      callback: {
        loginAdmin : function(){
          var credentials = $scope.modal.data.obj;
          fb.child('admin').once('value', function(nameSnapshot){
            var fbCredentials = nameSnapshot.val();
            if(credentials.usr === fbCredentials.adminUsr && $.md5(credentials.pin) === fbCredentials.adminPin && $.md5(credentials.pass) === fbCredentials.adminPass){
              $scope.modal.show = false;
              $location.path('/mainPageAdmin');
              localStorage.adminLoged = fbCredentials.adminPass;
            }
          });
        } 
      }
    };
});
