
if (!(typeof window !== "undefined" && window !== null)) {
  return;
}

describe('utils.animate(options) -> null', function() {
  var clock;
  clock = null;
  before(function() {
    return clock = sinon.useFakeTimers();
  });
  after(function() {
    return clock.restore();
  });
  it('should call callback each epoch with args x, epoch', function() {
    var callback, i, linear, _i, _results;
    callback = sinon.spy();
    linear = function(a, b, c, d, e) {
      return d * b + c;
    };
    animate({
      callbackEach: callback,
      easing: linear,
      duration: 1000,
      start: 0,
      end: 100
    });
    _results = [];
    for (i = _i = 0; _i < 10; i = ++_i) {
      clock.tick(i * 10);
      callback.called.should.be["true"];
      _results.push(callback.calledWith(linear(i / 1000, i, 0, 100, 1000), i).should.be["true"]);
    }
    return _results;
  });
  return it('should call callback done if callbackDone has specified', function() {
    var callback, callback2, linear;
    callback = sinon.spy();
    callback2 = sinon.spy();
    linear = function(a, b, c, d, e) {
      return d * b + c;
    };
    animate({
      callbackEach: callback,
      callbackDone: callback2,
      easing: linear,
      duration: 1000,
      start: 0,
      end: 100
    });
    clock.tick(1000);
    callback.called.should.be["true"];
    callback2.called.should.be["true"];
    return callback.calledWith(100, 1000).should.be["true"];
  });
});
