return if not window?

describe 'splitter.Splitter(core, fst, snd, defaultVolume=0.5) -> instance', ->
  fst = snd = instance = null

  before ->
    fst = new Panel(null)
    snd = new Panel(null)
    instance = new Splitter(null, fst, snd)
    # Add required methods as stubs
    instance.valueWidth = sinon.stub().returns(100)
    instance.minValue = sinon.stub().returns(10)
    instance.maxValue = sinon.stub().returns(90)

  it 'should be able to find at `Jencil.ui.widgets.splitters.Splitter`', ->
    Splitter.should.be.equal(Jencil.ui.widgets.splitters.Splitter)

  it 'should have `splitter` class', ->
    instance.element.hasClass('splitter').should.be.true

  describe '#init() -> instance', ->
    it 'should set `container` property and return the instance', ->
      instance.should.not.have.property('container')
      instance.init().should.be.equal(instance)
      instance.should.have.property('container')
      instance.container.should.be.instanceof(jQuery)
      instance.container.__evoluted__.should.be.true

  describe '#volume(value, skip) -> number | instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('volume').a('function')

    it 'should return the float value of the volume', ->
      instance.volume().should.be.a('number').equal(0.5)

    it 'should set the volume with calling `adjust` method', ->
      mock = sinon.mock(instance).expects('adjust').once()
      instance.volume(0.8)
      instance.volume().should.be.equal(0.8)
      mock.verify()
      instance.adjust.restore()

    it 'should set the volume without calling `adjust` method', ->
      mock = sinon.mock(instance).expects('adjust').never()
      instance.volume(0.2, true)
      instance.volume().should.be.equal(0.2)
      mock.verify()
      instance.adjust.restore()

  describe '#value(value, skip) -> number | instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('value').a('function')

    it 'should return the value of the splitter', ->
      instance.volume(0.2, true)
      instance.value().should.be.a('number').equal(20)

    it 'should set the value with calling `adjust` method', ->
      mock = sinon.mock(instance).expects('adjust').once()
      instance.value(80)
      instance.value().should.be.equal(80)
      mock.verify()
      instance.adjust.restore()

    it 'should set the value without calling `adjust` method', ->
      mock = sinon.mock(instance).expects('adjust').never()
      instance.value(80, true)
      instance.value().should.be.equal(80)
      mock.verify()
      instance.adjust.restore()


  describe '#regulateValue(value) -> number', ->
    it 'should be an instance property', ->
      instance.should.have.property('regulateValue').a('function')

    it 'should return the value if the value is within the range', ->
      instance.regulateValue(50).should.be.equal(50)

    it 'should return minValue if the value is lower than that', ->
      instance.regulateValue(0).should.be.equal(10)

    it 'should return maxValue if the value is higher than that', ->
      instance.regulateValue(100).should.be.equal(90)


describe 'splitter.VerticalSplitter(core, fst, snd, defaultVolume=0.5) -> instance', ->
  fst = snd = instance = null

  before ->
    fst = new Panel(null)
    snd = new Panel(null)
    instance = new VerticalSplitter(null, fst, snd)

    sandbox.appendChild fst.element.get(0)
    sandbox.appendChild snd.element.get(0)
    sandbox.appendChild instance.element.get(0)

    instance.init()

  after ->
    sandbox.removeAllChildren()

  it 'should be able to find at `Jencil.ui.widgets.splitters.VerticalSplitter`', ->
    VerticalSplitter.should.be.equal(Jencil.ui.widgets.splitters.VerticalSplitter)

  it 'should have `vertical` class', ->
    instance.element.hasClass('vertical').should.be.true

  it '#fst should have `left` class', ->
    instance.fst.element.hasClass('left').should.be.true

  it '#snd should have `right` class', ->
    instance.snd.element.hasClass('right').should.be.true

  describe '#mousemove(e) -> undefined', ->
    it 'should be an instance property', ->
      instance.should.have.property('mousemove').a('function')

    it 'should call #regulateValue(value) method to regulate the value', ->
      mock = sinon.mock(instance).expects('regulateValue').once()
      e = jQuery.Event('mousemove')
      e.pageX = 100
      instance.mousemove(e)
      mock.verify()
      instance.regulateValue.restore()

    it 'should call #value(value) method to set the value', ->
      mock = sinon.mock(instance).expects('value').once()
      e = jQuery.Event('mousemove')
      e.pageX = 100
      instance.mousemove(e)
      mock.verify()
      instance.value.restore()

  describe '#valueWidth() => number', ->
    it 'should be an instance property', ->
      instance.should.have.property('valueWidth').a('function')

    it 'should return the width of the container element', ->
      sandboxElement = $(sandbox.element)
      instance.valueWidth().should.be.equal(sandboxElement.width())

  describe '#minValue() => number', ->
    it 'should be an instance property', ->
      instance.should.have.property('minValue').a('function')

    it 'should return 0 if fst.minWidth and snd.maxWidth has not specified', ->
      instance.minValue().should.be.equal(0)

    it 'should return fst.minWidth if it has specified', ->
      instance.fst.element.css('min-width', '10px')
      instance.minValue().should.be.equal(10)

    it 'should return valueWidth - snd.maxWidth if it has specified', ->
      sinon.stub(instance, 'valueWidth', -> 100)
      instance.snd.element.css('max-width', '90px')
      instance.minValue().should.be.equal(10)
      instance.valueWidth.restore()

    it 'should return largest value if fst.minWidth and snd.maxWidth has specified', ->
      sinon.stub(instance, 'valueWidth', -> 100)
      instance.fst.element.css('min-width', '10px')
      instance.snd.element.css('max-width', '80px')
      instance.minValue().should.be.equal(20)

      instance.fst.element.css('min-width', '20px')
      instance.snd.element.css('max-width', '90px')
      instance.minValue().should.be.equal(20)
      instance.valueWidth.restore()

  describe '#maxValue() => number', ->
    it 'should be an instance property', ->
      instance.should.have.property('maxValue').a('function')

    it 'should return valueWidth if fst.maxWidth and snd.minWidth has not specified', ->
      sinon.stub(instance, 'valueWidth', -> 100)
      instance.maxValue().should.be.equal(100)
      instance.valueWidth.restore()

    it 'should return fst.maxWidth if it has specified', ->
      instance.fst.element.css('max-width', '10px')
      instance.maxValue().should.be.equal(10)

    it 'should return valueWidth - snd.minWidth if it has specified', ->
      sinon.stub(instance, 'valueWidth', -> 100)
      instance.snd.element.css('min-width', '90px')
      instance.maxValue().should.be.equal(10)
      instance.valueWidth.restore()

    it 'should return largest value if fst.maxWidth and snd.minWidth has specified', ->
      sinon.stub(instance, 'valueWidth', -> 100)
      instance.fst.element.css('max-width', '10px')
      instance.snd.element.css('min-width', '80px')
      instance.maxValue().should.be.equal(10)

      instance.fst.element.css('max-width', '20px')
      instance.snd.element.css('min-width', '90px')
      instance.maxValue().should.be.equal(10)
      instance.valueWidth.restore()

  describe '#adjust() -> instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('adjust').a('function')

    it 'should call `adjust` method of fst/snd, set element relativeX and return the instance', ->
      mock1 = sinon.mock(instance.fst).expects('adjust').once()
      mock2 = sinon.mock(instance.snd).expects('adjust').once()
      mock3 = sinon.mock(instance.element).expects('relativeX').once()
      instance.adjust().should.be.equal(instance)
      mock1.verify()
      mock2.verify()
      mock3.verify()
      # clean
      instance.fst.adjust.restore()
      instance.snd.adjust.restore()
      instance.element.relativeX.restore()

    it 'should hide fst and show snd when the volume is 0', ->
      sinon.stub(instance.fst.element, 'is', -> true)
      sinon.stub(instance.snd.element, 'is', -> false)
      sinon.stub(instance, 'value', -> 0)
      mock1 = sinon.mock(instance.fst.element).expects('hide').once()
      mock2 = sinon.mock(instance.snd.element).expects('show').once()
      instance.adjust()
      mock1.verify()
      mock2.verify()
      # clean
      instance.fst.element.is.restore()
      instance.snd.element.is.restore()
      instance.value.restore()
      instance.fst.element.hide.restore()
      instance.snd.element.show.restore()

    it 'should show fst and hide snd when the volume is max', ->
      sinon.stub(instance.fst.element, 'is', -> false)
      sinon.stub(instance.snd.element, 'is', -> true)
      sinon.stub(instance, 'value', -> instance.valueWidth())
      mock1 = sinon.mock(instance.fst.element).expects('show').once()
      mock2 = sinon.mock(instance.snd.element).expects('hide').once()
      instance.adjust()
      mock1.verify()
      mock2.verify()
      # clean
      instance.fst.element.is.restore()
      instance.snd.element.is.restore()
      instance.value.restore()
      instance.fst.element.show.restore()
      instance.snd.element.hide.restore()

    it 'should show fst/snd when the volume is between 0 to max', ->
      sinon.stub(instance.fst.element, 'is', -> false)
      sinon.stub(instance.snd.element, 'is', -> false)
      sinon.stub(instance, 'value', -> instance.valueWidth() / 2)
      mock1 = sinon.mock(instance.fst.element).expects('show').once()
      mock2 = sinon.mock(instance.snd.element).expects('show').once()
      instance.adjust()
      mock1.verify()
      mock2.verify()
      # clean
      instance.fst.element.is.restore()
      instance.snd.element.is.restore()
      instance.value.restore()
      instance.fst.element.show.restore()
      instance.snd.element.show.restore()


describe 'splitter.HorizontalSplitter(core, fst, snd, defaultVolume=0.5) -> instance', ->
  fst = snd = instance = null

  before ->
    fst = new Panel(null)
    snd = new Panel(null)
    instance = new HorizontalSplitter(null, fst, snd)

    sandbox.appendChild fst.element.get(0)
    sandbox.appendChild snd.element.get(0)
    sandbox.appendChild instance.element.get(0)

    instance.init()

  after ->
    sandbox.removeAllChildren()

  it 'should be able to find at `Jencil.ui.widgets.splitters.HorizontalSplitter`', ->
    HorizontalSplitter.should.be.equal(Jencil.ui.widgets.splitters.HorizontalSplitter)

  it 'should have `horizontal` class', ->
    instance.element.hasClass('horizontal').should.be.true

  it '#fst should have `top` class', ->
    instance.fst.element.hasClass('top').should.be.true

  it '#snd should have `bottom` class', ->
    instance.snd.element.hasClass('bottom').should.be.true

  describe '#mousemove(e) -> undefined', ->
    it 'should be an instance property', ->
      instance.should.have.property('mousemove').a('function')

    it 'should call #regulateValue(value) method to regulate the value', ->
      mock = sinon.mock(instance).expects('regulateValue').once()
      e = jQuery.Event('mousemove')
      e.pageY = 100
      instance.mousemove(e)
      mock.verify()
      instance.regulateValue.restore()

    it 'should call #value(value) method to set the value', ->
      mock = sinon.mock(instance).expects('value').once()
      e = jQuery.Event('mousemove')
      e.pageY = 100
      instance.mousemove(e)
      mock.verify()
      instance.value.restore()

  describe '#valueWidth() => number', ->
    it 'should be an instance property', ->
      instance.should.have.property('valueWidth').a('function')

    it 'should return the height of the container element', ->
      sandboxElement = $(sandbox.element)
      instance.valueWidth().should.be.equal(sandboxElement.height())

  describe '#minValue() => number', ->
    it 'should be an instance property', ->
      instance.should.have.property('minValue').a('function')

    it 'should return 0 if fst.minHeight and snd.maxHeight has not specified', ->
      instance.minValue().should.be.equal(0)

    it 'should return fst.minHeight if it has specified', ->
      instance.fst.element.css('min-height', '10px')
      instance.minValue().should.be.equal(10)

    it 'should return valueWidth - snd.maxHeight if it has specified', ->
      sinon.stub(instance, 'valueWidth', -> 100)
      instance.snd.element.css('max-height', '90px')
      instance.minValue().should.be.equal(10)
      instance.valueWidth.restore()

    it 'should return largest value if fst.minHeight and snd.maxHeight has specified', ->
      sinon.stub(instance, 'valueWidth', -> 100)
      instance.fst.element.css('min-height', '10px')
      instance.snd.element.css('max-height', '80px')
      instance.minValue().should.be.equal(20)

      instance.fst.element.css('min-height', '20px')
      instance.snd.element.css('max-height', '90px')
      instance.minValue().should.be.equal(20)
      instance.valueWidth.restore()

  describe '#maxValue() => number', ->
    it 'should be an instance property', ->
      instance.should.have.property('maxValue').a('function')

    it 'should return valueWidth if fst.maxHeight and snd.minHeight has not specified', ->
      sinon.stub(instance, 'valueWidth', -> 100)
      instance.maxValue().should.be.equal(100)
      instance.valueWidth.restore()

    it 'should return fst.maxHeight if it has specified', ->
      instance.fst.element.css('max-height', '10px')
      instance.maxValue().should.be.equal(10)

    it 'should return valueWidth - snd.minHeight if it has specified', ->
      sinon.stub(instance, 'valueWidth', -> 100)
      instance.snd.element.css('min-height', '90px')
      instance.maxValue().should.be.equal(10)
      instance.valueWidth.restore()

    it 'should return largest value if fst.maxHeight and snd.minHeight has specified', ->
      sinon.stub(instance, 'valueWidth', -> 100)
      instance.fst.element.css('max-height', '10px')
      instance.snd.element.css('min-height', '80px')
      instance.maxValue().should.be.equal(10)

      instance.fst.element.css('max-height', '20px')
      instance.snd.element.css('min-height', '90px')
      instance.maxValue().should.be.equal(10)
      instance.valueWidth.restore()

  describe '#adjust() -> instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('adjust').a('function')

    it 'should call `adjust` method of fst/snd, set element relativeY and return the instance', ->
      mock1 = sinon.mock(instance.fst).expects('adjust').once()
      mock2 = sinon.mock(instance.snd).expects('adjust').once()
      mock3 = sinon.mock(instance.element).expects('relativeY').once()
      instance.adjust().should.be.equal(instance)
      mock1.verify()
      mock2.verify()
      mock3.verify()
      # clean
      instance.fst.adjust.restore()
      instance.snd.adjust.restore()
      instance.element.relativeY.restore()

    it 'should hide fst and show snd when the volume is 0', ->
      sinon.stub(instance.fst.element, 'is', -> true)
      sinon.stub(instance.snd.element, 'is', -> false)
      sinon.stub(instance, 'value', -> 0)
      mock1 = sinon.mock(instance.fst.element).expects('hide').once()
      mock2 = sinon.mock(instance.snd.element).expects('show').once()
      instance.adjust()
      mock1.verify()
      mock2.verify()
      # clean
      instance.fst.element.is.restore()
      instance.snd.element.is.restore()
      instance.value.restore()
      instance.fst.element.hide.restore()
      instance.snd.element.show.restore()

    it 'should show fst and hide snd when the volume is max', ->
      sinon.stub(instance.fst.element, 'is', -> false)
      sinon.stub(instance.snd.element, 'is', -> true)
      sinon.stub(instance, 'value', -> instance.valueWidth())
      mock1 = sinon.mock(instance.fst.element).expects('show').once()
      mock2 = sinon.mock(instance.snd.element).expects('hide').once()
      instance.adjust()
      mock1.verify()
      mock2.verify()
      # clean
      instance.fst.element.is.restore()
      instance.snd.element.is.restore()
      instance.value.restore()
      instance.fst.element.show.restore()
      instance.snd.element.hide.restore()

    it 'should show fst/snd when the volume is between 0 to max', ->
      sinon.stub(instance.fst.element, 'is', -> false)
      sinon.stub(instance.snd.element, 'is', -> false)
      sinon.stub(instance, 'value', -> instance.valueWidth() / 2)
      mock1 = sinon.mock(instance.fst.element).expects('show').once()
      mock2 = sinon.mock(instance.snd.element).expects('show').once()
      instance.adjust()
      mock1.verify()
      mock2.verify()
      # clean
      instance.fst.element.is.restore()
      instance.snd.element.is.restore()
      instance.value.restore()
      instance.fst.element.show.restore()
      instance.snd.element.show.restore()

