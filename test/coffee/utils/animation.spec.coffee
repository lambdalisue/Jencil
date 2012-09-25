return if not window?
# Import
animate = Jencil.utils.animation.animate

describe 'Jencil.utils.animation.animate(options) -> null', ->
  sandbox = null

  beforeEach ->
    sandbox = sinon.sandbox.create({useFakeTimers: true})
  afterEach ->
    sandbox.verifyAndRestore()

  it 'should call callback each epoch with args x, epoch', ->
    callback = sandbox.spy()
    linear = (a, b, c, d, e) -> return d*b+c
    animate(
      callbackEach: callback
      easing: linear
      duration: 1000
      start: 0
      end: 100
    )
    for i in [0...11]
      sandbox.clock.tick(i*10)
      # callback should be called
      callback.called.should.be.true
      # should be called with args
      callback.calledWith(linear(i/1000, i, 0, 100, 1000), i).should.be.true

  it 'should call callback done if callbackDone has specified', ->
    callback1 = sandbox.spy()
    callback2 = sandbox.spy()
    linear = (a, b, c, d, e) -> return d*b+c
    animate(
      callbackEach: callback1
      callbackDone: callback2
      easing: linear
      duration: 1000
      start: 0
      end: 100
    )
    sandbox.clock.tick(1001)
    # callback should be called
    callback1.called.should.be.true
    callback2.called.should.be.true
    # should be called with args
    callback1.calledWith(100, 1000).should.be.true
