'use strict';

describe('Service: Imagespad', function () {

  // load the service's module
  beforeEach(module('blacksunApp'));

  // instantiate service
  var Imagespad;
  beforeEach(inject(function (_Imagespad_) {
    Imagespad = _Imagespad_;
  }));

  it('should do something', function () {
    expect(!!Imagespad).toBe(true);
  });

});
