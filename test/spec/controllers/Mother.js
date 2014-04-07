'use strict';

describe('Controller: MotherCtrl', function () {

  // load the controller's module
  beforeEach(module('blacksunApp'));

  var MotherCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MotherCtrl = $controller('MotherCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
