var animate;

if (!(typeof window !== "undefined" && window !== null)) {
  return;
}

animate = Jencil.utils.animation.animate;

describe('Jencil.utils.animation.animate(options) -> null', function() {
  it('should call callback each epoch with args x, epoch', sinon.test(function() {
    var callback, i, linear, _i, _results;
    callback = this.spy();
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
      this.clock.tick(i * 10);
      callback.called.should.be["true"];
      _results.push(callback.calledWith(linear(i / 1000, i, 0, 100, 1000), i).should.be["true"]);
    }
    return _results;
  }));
  return it('should call callback done if callbackDone has specified', sinon.test(function() {
    var callback, callback2, linear;
    callback = this.spy();
    callback2 = this.spy();
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
    this.clock.tick(1000);
    callback.called.should.be["true"];
    callback2.called.should.be["true"];
    return callback.calledWith(100, 1000).should.be["true"];
  }));
});
