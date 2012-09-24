return if not window?
# Import
curtainFactory = Jencil.utils.curtain.curtainFactory

describe 'Jencil.utils.curtain.curtainFactory(element) -> instance', ->
  instance = null

  before ->
    instance = curtainFactory($(sandbox.createElement('div')))
  after ->
    sandbox.removeAllChildren()

  describe '#on() -> instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('on').a('function')

    it 'should show the curtain element', ->
      instance.on()
      instance.css('display').should.be.equal('block')

  describe '#off() -> instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('off').a('function')

    it 'should hide the curtain element', ->
      instance.off()
      instance.css('display').should.be.equal('none')

  describe '#refresh() -> instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('refresh').a('function')

    it 'should set the size of the curtain element equal to parent element', ->
      instance.width 0
      instance.height 0
      instance.refresh()
      parent = instance.parent()
      instance.width().should.be.equal(parent.outerWidth(true))
      instance.height().should.be.equal(parent.outerHeight(true))
