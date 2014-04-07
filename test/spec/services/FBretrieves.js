'use strict';

describe('Service: Fbretrieves', function () {

  // load the service's module
  beforeEach(module('blacksunApp'));

  // instantiate service
  var Fbretrieves;
  beforeEach(inject(function (_Fbretrieves_) {
    Fbretrieves = _Fbretrieves_;
  }));

  it('should do something', function () {
    expect(!!Fbretrieves).toBe(true);
  });

});
