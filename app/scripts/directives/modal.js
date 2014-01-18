'use strict';

angular.module('blacksunApp').directive('modal', function(){
  return {
    restrict    : 'E',
    templateUrl : 'views/directives/modal.html',
    scope: {
      data      : '=modaldata',
      callback  : '=',
      template  : '@',
      show      : '=',
      minWidth  : '@',
      maxWidth  : '@',
      maxHeight : '@'
    },
    controller: function($scope, $element, $attrs){
      var body, modalOpen;
      

      body      = angular.element(document.body);
      
      modalOpen = 'modal-open';
      
      $scope.$watch('show', function(){
        if ($scope.show) {
          return body.addClass(modalOpen);
        }else{
          return body.removeClass(modalOpen);
        }
      });
      
      $scope.closeModal = function(){
        return $scope.show = false;
      };
      
      /*return $element.on('keyup', function(e){
        switch (e.keyCode){
          case 27:
            return $scope.$apply(function() {
              return $scope.show = false;
            });
        }
      });*/
    }
  };
});
