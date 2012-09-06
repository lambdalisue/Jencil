return if not window?

describe 'extends.jQuery', ->
  div = instance = null

  factory = (div) ->
    instance = jQuery(div)
    instance.width 10
    instance.height 10
    instance.css
      'margin': 5
      'border-style': 'solid'
      'border-width': 10
      'padding': 15
    return instance

  before ->
    div = sandbox.createElement('div')
    instance = factory(div)

  describe '#ncss(propertyName, [defaultValue=null]) => number | defaultValue', ->
    it 'should return number value of a particular css number property', ->
      instance.css 'min-width', 10
      instance.should.have.a.property('ncss').a('function')
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

  describe '#outerWidth([includeMargin=false, value]) => number | instance', ->
    it 'should return outer width (border + padding + width) of the widget', ->
      instance.should.have.a.property('outerWidth').a('function')
      instance.outerWidth().should.be.a('number').equal(60)

    it 'should return outer width include margin (margin + border + padding + width) of the widget', ->
      instance.outerWidth(true).should.be.a('number').equal(70)

    it 'should change outer width of the widget and return this instance', ->
      instance.outerWidth(false, 100).should.be.equal(instance)
      instance.width().should.be.equal(50)
      # short-style
      instance.outerWidth(150).should.be.equal(instance)
      instance.width().should.be.equal(100)

    it 'should change outer width include margin of the widget and return this instance', ->
      instance.outerWidth(true, 100).should.be.equal(instance)
      instance.width().should.be.equal(40)

  describe '#outerHeight([includeMargin=false, value]) => number | instance', ->
    it 'should return outer height of the widget', ->
      instance.should.have.a.property('outerHeight').a('function')
      instance.outerHeight().should.be.a('number').equal(60)

    it 'should return outer height include margin of the widget', ->
      instance.outerHeight(true).should.be.a('number').equal(70)

    it 'should change outer height of the widget and return this instance', ->
      instance.outerHeight(false, 100).should.be.equal(instance)
      instance.height().should.be.equal(50)
      # short-style
      instance.outerHeight(150).should.be.equal(instance)
      instance.height().should.be.equal(100)

    it 'should change outer height include margin of the widget and return this instance', ->
      instance.outerHeight(true, 100).should.be.equal(instance)
      instance.height().should.be.equal(40)

  describe '#nonContentWidth([includeMargin=false]) => number', ->
    it 'should return non content width (border + padding)', ->
      instance.should.have.property('nonContentWidth').a('function')
      instance.nonContentWidth().should.be.equal(50)

    it 'should return non content width include margin (margin + border + padding) with includeMargin=true', ->
      instance.nonContentWidth(true).should.be.equal(60)

  describe '#nonContentHeight([includeMargin=false]) => number', ->
    it 'should return non content height (border + padding)', ->
      instance.should.have.property('nonContentHeight').a('function')
      instance.nonContentHeight().should.be.equal(50)

    it 'should return non content height include margin (margin + border + padding) with includeMargin=true', ->
      instance.nonContentHeight(true).should.be.equal(60)

  describe '#minWidth() => number | null', ->
    it 'should return min width', ->
      instance.css 'min-width', 10
      instance.should.have.a.property('minWidth').a('function')
      instance.minWidth().should.be.a('number').equal(10)
      
  describe '#minHeight() => number | null', ->
    it 'should return min height', ->
      instance.css 'min-height', 10
      instance.should.have.a.property('minHeight').a('function')
      instance.minHeight().should.be.a('number').equal(10)

  describe '#maxWidth() => number | null', ->
    it 'should return max width', ->
      instance.css 'max-width', 10
      instance.should.have.a.property('maxWidth').a('function')
      instance.maxWidth().should.be.a('number').equal(10)

    it 'should return null for widget which has no max width', ->
      instance2 = jQuery("<div>")
      expect(instance2.maxWidth()).equal(null)

  describe '#maxHeight() => number | null', ->
    it 'should return max height', ->
      instance.css 'max-height', 10
      instance.should.have.a.property('maxHeight').a('function')
      instance.maxHeight().should.be.a('number').equal(10)

    it 'should return null for widget which has no max height', ->
      instance2 = jQuery("<div>")
      expect(instance2.maxHeight()).equal(null)
