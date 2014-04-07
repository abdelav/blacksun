'use strict';

describe('Service: Fburl', function () {

  // load the service's module
  beforeEach(module('blacksunApp'));

  // instantiate service
  var Fburl;
  beforeEach(inject(function (_Fburl_) {
    Fburl = _Fburl_;
  }));

  it('should do something', function () {
    expect(!!Fburl).toBe(true);
  });

});
