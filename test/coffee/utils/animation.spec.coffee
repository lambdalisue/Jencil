return if not window?
# Import
animate = Jencil.utils.animation.animate

describe 'Jencil.utils.animation.animate(options) -> null', ->
  it 'should call callback each epoch with args x, epoch', sinon.test ->
    callback = @spy()
    linear = (a, b, c, d, e) -> return d*b+c
    animate(
      callbackEach: callback
      easing: linear
      duration: 1000
      start: 0
      end: 100
    )
    for i in [0...10]
      @clock.tick(i*10)
      # callback should be called
      callback.called.should.be.true
      # should be called with args
      callback.calledWith(linear(i/1000, i, 0, 100, 1000), i).should.be.true

  it 'should call callback done if callbackDone has specified', sinon.test ->
    callback = @spy()
    callback2 = @spy()
    linear = (a, b, c, d, e) -> return d*b+c
    animate(
      callbackEach: callback
      callbackDone: callback2
      easing: linear
      duration: 1000
      start: 0
      end: 100
    )
    @clock.tick(1000)
    # callback should be called
    callback.called.should.be.true
    callback2.called.should.be.true
    # should be called with args
    callback.calledWith(100, 1000).should.be.true
