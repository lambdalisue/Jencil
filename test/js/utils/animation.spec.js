(function() {
  var animate;

  if (!(typeof window !== "undefined" && window !== null)) {
    return;
  }

  animate = Jencil.utils.animation.animate;

  describe('Jencil.utils.animation.animate(options) -> null', function() {
    var sandbox;
    sandbox = null;
    beforeEach(function() {
      return sandbox = sinon.sandbox.create({
        useFakeTimers: true
      });
    });
    afterEach(function() {
      return sandbox.verifyAndRestore();
    });
    it('should call callback each epoch with args x, epoch', function() {
      var callback, i, linear, _i, _results;
      callback = sandbox.spy();
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
      for (i = _i = 0; _i < 11; i = ++_i) {
        sandbox.clock.tick(i * 10);
        callback.called.should.be["true"];
        _results.push(callback.calledWith(linear(i / 1000, i, 0, 100, 1000), i).should.be["true"]);
      }
      return _results;
    });
    return it('should call callback done if callbackDone has specified', function() {
      var callback1, callback2, linear;
      callback1 = sandbox.spy();
      callback2 = sandbox.spy();
      linear = function(a, b, c, d, e) {
        return d * b + c;
      };
      animate({
        callbackEach: callback1,
        callbackDone: callback2,
        easing: linear,
        duration: 1000,
        start: 0,
        end: 100
      });
      sandbox.clock.tick(1001);
      callback1.called.should.be["true"];
      callback2.called.should.be["true"];
      return callback1.calledWith(100, 1000).should.be["true"];
    });
  });

}).call(this);
