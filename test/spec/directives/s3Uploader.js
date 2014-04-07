'use strict';

describe('Directive: s3Uploader', function () {

  // load the directive's module
  beforeEach(module('blacksunApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<s3-uploader></s3-uploader>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the s3Uploader directive');
  }));
});
