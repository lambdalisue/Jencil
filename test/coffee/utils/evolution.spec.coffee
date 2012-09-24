return if not window?
# Import
evolute = Jencil.utils.evolution.evolute

WIDTH = HEIGHT = 10
MARGIN = 30
PADDING = 20
BORDER = 10

describe "Jencil.utils.evolution.evolute(jQueryObj) => object", ->
  it "should return extended jQueryObj", ->
    instance = $(sandbox.createElement('div'))
    instance = evolute(instance)
    instance.should.be.a.instanceof(jQuery)

  instance = null

  before ->
    instance = $(sandbox.createElement('div'))
    instance = evolute(instance)

  after ->
    sandbox.removeAllChildren()

  beforeEach ->
    # set width/height
    instance.width WIDTH
    instance.height HEIGHT
    # set margin/padding/border
    instance.css
      'margin': MARGIN/2
      'padding': PADDING/2
      'border-width': BORDER/2
      'border-style': 'solid'

  describe '#nonContentWidth(includeMargin=false) => number', ->
    it 'should be an instance property', ->
      instance.should.have.property('nonContentWidth').a('function')

    it 'should return non content width (padding + border)', ->
      value = instance.nonContentWidth()
      expect(value).equal(PADDING+BORDER)

    it 'should return non content width with margin (padding + border + margin)', ->
      value = instance.nonContentWidth(true)
      expect(value).equal(PADDING+BORDER+MARGIN)

  describe '#nonContentHeight(includeMargin=false) => number', ->
    it 'should be an instance property', ->
      instance.should.have.property('nonContentHeight').a('function')

    it 'should return non content height (padding + border)', ->
      value = instance.nonContentHeight()
      expect(value).equal(PADDING+BORDER)

    it 'should return non content height with margin (padding + border + margin)', ->
      value = instance.nonContentHeight(true)
      expect(value).equal(PADDING+BORDER+MARGIN)

  describe '#outerWidth(includeMargin=false, value) => number | instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('outerWidth').a('function')
      # the instance should have ORIGINAL method
      instance.should.have.property('_outerWidth').a('function')

    it 'should return outer width (width + non content width)', ->
      value = instance.outerWidth()
      expect(value).equal(WIDTH+PADDING+BORDER)

    it 'should return outer width with margin (width + non content width + margin)', ->
      value = instance.outerWidth(true)
      expect(value).equal(WIDTH+PADDING+BORDER+MARGIN)

    it 'should set outer width (width + non content width) and return the instance', ->
      instance.outerWidth(false, 100).should.be.equal(instance)
      value = instance.outerWidth()
      expect(value).equal(100)
      # short format
      instance.outerWidth(200).should.be.equal(instance)
      value = instance.outerWidth()
      expect(value).equal(200)

    it 'should set outer width with margin (width + non content width + margin) and return the instance', ->
      instance.outerWidth(true, 100).should.be.equal(instance)
      value = instance.outerWidth(true)
      expect(value).equal(100)

  describe '#outerHeight(includeMargin=false, value) => number | instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('outerHeight').a('function')
      # the instance should have ORIGINAL method
      instance.should.have.property('_outerHeight').a('function')

    it 'should return outer height (height + non content height)', ->
      value = instance.outerHeight()
      expect(value).equal(WIDTH+PADDING+BORDER)

    it 'should return outer height with margin (height + non content height + margin)', ->
      value = instance.outerHeight(true)
      expect(value).equal(WIDTH+PADDING+BORDER+MARGIN)

    it 'should set outer height (height + non content height) and return the instance', ->
      instance.outerHeight(false, 100).should.be.equal(instance)
      value = instance.outerHeight()
      expect(value).equal(100)
      # short format
      instance.outerHeight(200).should.be.equal(instance)
      value = instance.outerHeight()
      expect(value).equal(200)

    it 'should set outer height with margin (height + non content height + margin) return the instance', ->
      instance.outerHeight(true, 100).should.be.equal(instance)
      value = instance.outerHeight(true)
      expect(value).equal(100)

  describe '#ncss(propertyName, [defaultValue=null]) => number | defaultValue', ->
    it 'should be an instance property', ->
      instance.should.have.property('ncss').a('function')

    it 'should return number value of a particular css number property', ->
      instance.css 'min-width', 10
      # css return string
      expect(instance.css('min-width')).a('string').equal('10px')
      # ncss return number
      expect(instance.ncss('min-width')).a('number').equal(10)

    it 'should return defaultValue when the value is not exist', ->
      # css return string
      expect(instance.css('max-width')).a('string').equal('none')
      # ncss return number
      expect(instance.ncss('max-width')).not.exist
      expect(instance.ncss('max-width', 10)).a('number').equal(10)

  describe '#minWidth() => number | null', ->
    it 'should be an instance property', ->
      instance.should.have.property('minWidth').a('function')

    it 'should return min width', ->
      instance.css 'min-width', 10
      instance.minWidth().should.be.a('number').equal(10)

  describe '#minHeight() => number | null', ->
    it 'should be an instance property', ->
      instance.should.have.property('minHeight').a('function')

    it 'should return min height', ->
      instance.css 'min-height', 10
      instance.minHeight().should.be.a('number').equal(10)

  describe '#maxWidth() => number | null', ->
    it 'should be an instance property', ->
      instance.should.have.property('maxWidth').a('function')

    it 'should return max width', ->
      instance.css 'max-width', 10
      instance.maxWidth().should.be.a('number').equal(10)

    it 'should return null for widget which has no max width', ->
      instance2 = evolute(jQuery("<div>"))
      expect(instance2.maxWidth()).equal(null)

  describe '#maxHeight() => number | null', ->
    it 'should be an instance property', ->
      instance.should.have.property('maxHeight').a('function')

    it 'should return max height', ->
      instance.css 'max-height', 10
      instance.should.have.a.property('maxHeight').a('function')
      instance.maxHeight().should.be.a('number').equal(10)

    it 'should return null for widget which has no max height', ->
      instance2 = evolute(jQuery("<div>"))
      expect(instance2.maxHeight()).equal(null)

  describe '#contentX(includeMargin=false) => number', ->
    it 'should be an instance property', ->
      instance.should.have.property('contentX').a('function')

    it 'should return contentX (borderLeft + paddingLeft)', ->
      value = instance.contentX()
      expect(value).equal((BORDER+PADDING)/2)

    it 'should return contentX with margin (borderLeft + paddingLeft + marginLeft)', ->
      value = instance.contentX(true)
      expect(value).equal((BORDER+PADDING+MARGIN)/2)

  describe '#contentY(includeMargin=false) => number', ->
    it 'should be an instance property', ->
      instance.should.have.property('contentY').a('function')

    it 'should return contentY (borderTop + paddingTop)', ->
      value = instance.contentY()
      expect(value).equal((BORDER+PADDING)/2)

    it 'should return contentY with margin (borderTop + paddingTop + marginTop)', ->
      value = instance.contentY(true)
      expect(value).equal((BORDER+PADDING+MARGIN)/2)

  describe '#absoluteX(value) => number | instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('absoluteX').a('function')

    it 'should return absoluteX (offset.left)', ->
      value = instance.absoluteX()
      offset = instance.offset()
      expect(value).equal(offset.left)

    it 'should set absoluteX (offset.left) and return the instance', ->
      value = instance.absoluteX()
      instance.absoluteX(value+20).should.be.equal(instance)
      instance.absoluteX().should.be.equal(value+20)

  describe '#absoluteY(value) => number | instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('absoluteY').a('function')

    it 'should return absoluteY (offset.top)', ->
      value = instance.absoluteY()
      offset = instance.offset()
      expect(value).equal(offset.top)

    it 'should set absoluteY (offset.top) and return the instance', ->
      value = instance.absoluteY()
      instance.absoluteY(value+20).should.be.equal(instance)
      instance.absoluteY().should.be.equal(value+20)

  describe '#relativeX(includeMargin=false, value) => number | instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('relativeX').a('function')

    it 'should return relativeX (x value from parent contentX)', ->
      instance2 = evolute($('<div>'))
      instance2.appendTo instance

      value = instance2.relativeX()
      absoluteX = instance2.absoluteX()
      parentAbsoluteX = instance.absoluteX()
      parentContentX = instance.contentX()

      expect(value).equal(absoluteX - parentAbsoluteX - parentContentX)

    it 'should return relativeX (x value from parent contentX) with margin', ->
      instance2 = evolute($('<div>'))
      instance2.appendTo instance

      value = instance2.relativeX(true)
      absoluteX = instance2.absoluteX()
      parentAbsoluteX = instance.absoluteX()
      parentContentX = instance.contentX(true)

      expect(value).equal(absoluteX - parentAbsoluteX - parentContentX)

    it 'should set relativeX (x value from parent contentX) and return the instance', ->
      instance2 = evolute($('<div>'))
      instance2.appendTo instance

      instance2.relativeX(false, 200).should.be.equal(instance2)
      instance2.relativeX().should.be.equal(200)

      # short
      instance2.relativeX(300).should.be.equal(instance2)
      instance2.relativeX().should.be.equal(300)

  describe '#relativeY(includeMargin=false, value) => number | instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('relativeY').a('function')

    it 'should return relativeY (y value from parent contentY)', ->
      instance2 = evolute($('<div>'))
      instance2.appendTo instance

      value = instance2.relativeY()
      absoluteY = instance2.absoluteY()
      parentAbsoluteY = instance.absoluteY()
      parentContentY = instance.contentY()

      expect(value).equal(absoluteY - parentAbsoluteY - parentContentY)

    it 'should return relativeY (y value from parent contentY) with margin', ->
      instance2 = evolute($('<div>'))
      instance2.appendTo instance

      value = instance2.relativeY(true)
      absoluteY = instance2.absoluteY()
      parentAbsoluteY = instance.absoluteY()
      parentContentY = instance.contentY(true)

      expect(value).equal(absoluteY - parentAbsoluteY - parentContentY)

    it 'should set relativeY (y value from parent contentY) and return the instance', ->
      instance2 = evolute($('<div>'))
      instance2.appendTo instance

      instance2.relativeY(false, 200).should.be.equal(instance2)
      instance2.relativeY().should.be.equal(200)

      # short
      instance2.relativeY(300).should.be.equal(instance2)
      instance2.relativeY().should.be.equal(300)
