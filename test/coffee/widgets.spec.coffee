return if not window?
# Import
Widget = Jencil.widgets.Widget
Panel = Jencil.widgets.Panel
MultiplePanel = Jencil.widgets.MultiplePanel
VerticalPanel = Jencil.widgets.VerticalPanel
HorizontalPanel = Jencil.widgets.HorizontalPanel

describe 'Jencil.widgets.Widget(core, selector="<div>", context) -> instance', ->
  it 'should have element instance which is evoluted jQueryObj', ->
    instance = new Widget(null)
    instance.should.have.property('element').instanceof(jQuery)
    # evoluted instance have __evoluted__ = true
    instance.element.should.have.property('__evoluted__')
    instance.element.__evoluted__.should.be.true

  describe '#init() -> instance', ->
    instance = new Widget(null)

    it 'should be an instance property', ->
      instance.should.have.property('init').a('function')

    it 'should return the instance', ->
      instance.init().should.equal(instance)

  describe '#adjust() -> instance', ->
    instance = new Widget(null)

    it 'should be an instance property', ->
      instance.should.have.property('adjust').a('function')

    it 'should return the instance', ->
      instance.adjust().should.equal(instance)

describe 'Jencil.widgets.Panel(core, selector="<div>", context) extends Widget -> instance', ->
  it 'should add `panel` class to the element', ->
    instance = new Panel(null)
    instance.element.hasClass('panel').should.be.true

describe 'Jencil.widgets.MultiplePanel(core, fst, snd, splitter) extends Panel -> instance', ->
  sandbox = fst = snd = splitter = instance = null

  before ->
    fst = new Panel(null)
    snd = new Panel(null)
    splitter = new Jencil.splitters.VerticalSplitter(null, fst, snd, 0.5)
    instance = new MultiplePanel(null, fst, snd, splitter)
    blackbox.add instance.element
    instance.init()
    instance.adjust()
  after ->
    blackbox.clear()
  beforeEach ->
    sandbox = sinon.sandbox.create({useFakeTimers: true})
  afterEach ->
    sandbox.verifyAndRestore()

  it 'should add `multiple` class to the element', ->
    instance.element.hasClass('multiple').should.be.true

  describe '#init() -> instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('init').a('function')

    it 'should call `init` method of fst, snd and splitter', ->
      sandbox.mock(fst).expects('init').once()
      sandbox.mock(snd).expects('init').once()
      sandbox.mock(splitter).expects('init').once()
      instance.init()

  describe '#fst.show() -> instance', ->
    it 'should be an instance property', ->
      fst.should.have.property('show').a('function')

    it 'should make fst to be visible 500ms after called', ->
      sandbox.stub(fst.element, 'is', -> @css('display') is 'block')
      splitter.volume 0
      fst.element.css('display').should.be.equal('none')
      fst.show()
      fst.element.css('display').should.be.equal('none')
      sandbox.clock.tick(500)
      fst.element.css('display').should.be.equal('block')

  describe '#fst.hide() -> instance', ->
    it 'should be an instance property', ->
      fst.should.have.property('hide').a('function')

    it 'should make fst to be unvisible 500ms after called', ->
      sandbox.stub(fst.element, 'is', -> @css('display') is 'block')
      splitter.volume 0.5
      fst.element.css('display').should.be.equal('block')
      fst.hide()
      fst.element.css('display').should.be.equal('block')
      sandbox.clock.tick(500)
      fst.element.css('display').should.be.equal('none')

  describe '#fst.toggle() -> instance', ->
    it 'should be an instance property', ->
      fst.should.have.property('toggle').a('function')

    it 'should toggle visibility of fst 500ms after called', ->
      sandbox.stub(fst.element, 'is', -> @css('display') is 'block')
      fst.hide()
      sandbox.clock.tick(500)
      fst.toggle()
      sandbox.clock.tick(500)
      fst.element.css('display').should.be.equal('block')
      fst.toggle()
      sandbox.clock.tick(500)
      fst.element.css('display').should.be.equal('none')

  describe '#snd.show() -> instance', ->
    it 'should be an instance property', ->
      snd.should.have.property('show').a('function')

    it 'should make snd to be visible 500ms after called', ->
      sandbox.stub(snd.element, 'is', -> @css('display') is 'block')
      splitter.volume 1
      snd.element.css('display').should.be.equal('none')
      snd.show()
      snd.element.css('display').should.be.equal('none')
      sandbox.clock.tick(500)
      snd.element.css('display').should.be.equal('block')

  describe '#snd.hide() -> instance', ->
    it 'should be an instance property', ->
      snd.should.have.property('hide').a('function')

    it 'should make snd to be unvisible 500ms after called', ->
      sandbox.stub(snd.element, 'is', -> @css('display') is 'block')
      splitter.volume 0.5
      snd.element.css('display').should.be.equal('block')
      snd.hide()
      snd.element.css('display').should.be.equal('block')
      sandbox.clock.tick(500)
      snd.element.css('display').should.be.equal('none')

  describe '#snd.toggle() -> instance', ->
    it 'should be an instance property', ->
      snd.should.have.property('toggle').a('function')

    it 'should toggle visibility of snd 500ms after called', ->
      sandbox.stub(snd.element, 'is', -> @css('display') is 'block')
      snd.hide()
      sandbox.clock.tick(500)
      snd.toggle()
      sandbox.clock.tick(500)
      snd.element.css('display').should.be.equal('block')
      snd.toggle()
      sandbox.clock.tick(500)
      snd.element.css('display').should.be.equal('none')

describe 'Jencil.widgets.VerticalPanel(core, fst, snd, splitter) extends MultiplePanel -> instance', ->
  sandbox = fst = snd = splitter = instance = null

  before ->
    fst = new Panel(null)
    snd = new Panel(null)
    instance = new VerticalPanel(null, fst, snd, splitter)
    blackbox.add instance.element
    instance.init()
    instance.adjust()

  after ->
    blackbox.clear()
  beforeEach ->
    sandbox = sinon.sandbox.create()
  afterEach ->
    sandbox.verifyAndRestore()

  it 'should add `vertical` class to the element', ->
    instance.element.hasClass('vertical').should.be.true

  describe '#adjust() -> instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('adjust').a('function')

    it 'should call some downstream methods and return the instance', ->
      sandbox.mock(instance.fst.element).expects('outerHeight').once()
      sandbox.mock(instance.snd.element).expects('outerHeight').once()
      sandbox.mock(instance.splitter).expects('adjust').once()
      instance.adjust().should.be.equal(instance)

    it 'should set height of each elements as maximum', ->
      instance.adjust()
      height = instance.element.height()
      fst.element.outerHeight(true).should.be.equal(height)
      snd.element.outerHeight(true).should.be.equal(height)
      instance.splitter.element.outerHeight(true).should.be.equal(height)

describe 'Jencil.widgets.HorizontalPanel(core, fst, snd, splitter) extends MultiplePanel -> instance', ->
  sandbox = fst = snd = splitter = instance = null

  before ->
    fst = new Panel(null)
    snd = new Panel(null)
    instance = new HorizontalPanel(null, fst, snd, splitter)
    blackbox.add instance.element
    instance.init()
    instance.adjust()

  after ->
    blackbox.clear()
  beforeEach ->
    sandbox = sinon.sandbox.create()
  afterEach ->
    sandbox.verifyAndRestore()

  it 'should add `horizontal` class to the element', ->
    instance.element.hasClass('horizontal').should.be.true

  describe '#adjust() -> instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('adjust').a('function')

    it 'should call some downstream methods and return the instance', ->
      sandbox.mock(instance.fst.element).expects('outerWidth').once()
      sandbox.mock(instance.snd.element).expects('outerWidth').once()
      sandbox.mock(instance.splitter).expects('adjust').once()
      instance.adjust().should.be.equal(instance)

    it 'should set width of each elements as maximum', ->
      instance.adjust()
      width = instance.element.width()
      fst.element.outerWidth(true).should.be.equal(width)
      snd.element.outerWidth(true).should.be.equal(width)
      instance.splitter.element.outerWidth(true).should.be.equal(width)

