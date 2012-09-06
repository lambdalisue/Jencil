return if not window?

describe 'ui.widget.Widget', ->
  core = div = instance = children = null

  before ->
    textarea = sandbox.createElement 'textarea'
    core = new JencilCore($(textarea))
    div = sandbox.createElement 'div'
    div1 = sandbox.createElement 'div'
    div2 = sandbox.createElement 'div'
    div3 = sandbox.createElement 'div'
    instance = new Widget core, div
    children = [
      new Widget(core, div1),
      new Widget(core, div2),
      new Widget(core, div3),
    ]
    instance.element.append(c.element) for c in children

  describe '.core : JencilCore instance', ->
    it 'should be an instance of JencilCore', ->
      instance.should.have.a.property('core').a('object')
      instance.core.should.be.a.instanceof(JencilCore)

  describe '#constructor(core, selector, context) => instance', ->
    it 'should return same instance for same element', ->
      div2 = sandbox.createElement 'div'
      instance1 = new Widget core, div
      instance2 = new Widget core, div
      instance3 = new Widget core, div2
      instance4 = new Widget core, div2

      instance1.should.be.equal(instance2)
      instance1.should.not.be.equal(instance3)
      instance1.should.not.be.equal(instance4)

  describe "#factory(jQueryObj) => instance", ->
    it 'should return a widget instance of the jQueryObj', ->
      instance.should.have.a.property('factory').a('function')
      instance2 = instance.factory(instance.element)
      instance2.should.be.equal(instance)

  describe "#parent() => instance", ->
    it 'should return a parent widget instance', ->
      instance.should.have.a.property('parent').a('function')
      for child in children
        child.parent().should.be.eql(instance)

  describe "#children() => array", ->
    it 'should return an array of children widget instances', ->
      instance.should.have.a.property('children').a('function')
      instance.children().should.be.eql(children)

  describe '#init() => instance', ->
    it 'should return the instance', ->
      instance.should.have.a.property('init').a('function')
      instance.init().should.be.equal(instance)

    it 'should call `init` method of its children', ->
      mocks = (sinon.mock(c).expects('init').once() for c in children)
      instance.init()
      mock.verify() for mock in mocks

    it 'should call `adjust` method of it', ->
      mock = sinon.mock(instance).expects('init', 'adjust').once()
      instance.init()
      mock.verify()

  describe '#adjust() => instance', ->
    it 'should return the instance', ->
      instance.should.have.a.property('adjust').a('function')
      instance.adjust().should.be.equal(instance)

    it 'should call `adjust` method of its children', ->
      mocks = (sinon.mock(c).expects('adjust').once() for c in children)
      instance.adjust()
      mock.verify() for mock in mocks
