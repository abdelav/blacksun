'use strict';

describe('Service: Languagesswitch', function () {

  // load the service's module
  beforeEach(module('blacksunApp'));

  // instantiate service
  var Languagesswitch;
  beforeEach(inject(function (_Languagesswitch_) {
    Languagesswitch = _Languagesswitch_;
  }));

  it('should do something', function () {
    expect(!!Languagesswitch).toBe(true);
  });

});
