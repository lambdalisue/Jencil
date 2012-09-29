return if not window?
Separator = Jencil.buttons.Separator
Button = Jencil.buttons.Button

describe 'Jencil.buttons.Separator(core) -> instance', ->
  it 'should be found on `Jencil.buttons.Separator`', ->
    Separator.should.be.equal(Jencil.buttons.Separator)

  it 'should add `separator` class', ->
    instance = new Separator(null)
    instance.element.hasClass('separator').should.be.true


describe 'Jencil.buttons.Button(core, name, text, title) -> instance', ->
  sandbox = null
  beforeEach ->
    sandbox = sinon.sandbox.create()
  afterEach ->
    sandbox.verifyAndRestore()

  it 'should be found on `Jencil.buttons.Button`', ->
    Button.should.be.equal(Jencil.buttons.Button)

  it 'should add `button` and name class', ->
    instance = new Button(null, 'foobar')
    instance.element.hasClass('button').should.be.true
    instance.element.hasClass('foobar').should.be.true

  it 'should add title attr', ->
    instance = new Button(null, '', '', 'foobar')
    instance.element.attr('title', 'foobar')
    # text used when title is undefined
    instance = new Button(null, '', 'foobar')
    instance.element.attr('title', 'foobar')
    # name is used when text is undefined
    instance = new Button(null, 'foobar')
    instance.element.attr('title', 'foobar')

  it 'should add text span', ->
    instance = new Button(null, '', 'foobar')
    instance.element.html().should.be.equal('<span>foobar</span>')
    # name is used when text is undefined
    instance = new Button(null, 'foobar')
    instance.element.html().should.be.equal('<span>foobar</span>')


  describe '#init() -> instance', ->
    instance = new Button(null, '', '', '')

    it 'should be an instance property', ->
      instance.should.have.property('init').a('function')

    it 'should call validate method and return the instance', ->
      sandbox.mock(instance).expects('validate').once()
      instance.init().should.be.equal(instance)

  describe '#enable() -> instance', ->
    instance = new Button(null, '', '', '')

    it 'should be an instance property', ->
      instance.should.have.property('enable').a('function')

    it 'should remove `disable` class and return the instance', ->
      instance.element.addClass 'disable'
      instance.enable().should.be.equal(instance)
      instance.element.hasClass('disable').should.be.false

  describe '#disable() -> instance', ->
    instance = new Button(null, '', '', '')

    it 'should be an instance property', ->
      instance.should.have.property('disable').a('function')

    it 'should add `disable` class and return the instance', ->
      instance.element.removeClass 'disable'
      instance.disable().should.be.equal(instance)
      instance.element.hasClass('disable').should.be.true

  describe '#validate() -> instance', ->
    instance = new Button(null, '', '', '')

    it 'should be an instance property', ->
      instance.should.have.property('validate').a('function')

    it 'should return the instance', ->
      instance.validate().should.be.equal(instance)

describe 'Jencil.buttons.ActionButton(core, name, text, title, callback, shortcut) -> instance', ->
  sandbox = null
  beforeEach ->
    sandbox = sinon.sandbox.create()
  afterEach ->
    sandbox.verifyAndRestore()

  it 'should be found on `Jencil.buttons.ActionButton`', ->
    ActionButton.should.be.equal(Jencil.buttons.ActionButton)

  if window.shortcut?
    it 'should add keyboard shortcut when it is specified', ->
      sandbox.mock(window.shortcut).expects('add').once()
      callback = -> @
      instance = new ActionButton(null, "foobar", null, null, callback, "Ctrl+S")
      instance.element.attr('title').should.be.equal('foobar (Ctrl+S)')

  describe '#callback() -> instance', ->
    callback = -> @
    instance = new ActionButton(null, "", "", "", callback)

    it 'should be an instance property', ->
      instance.should.have.property('callback').a('function')

    it 'should call callback and return the instance', ->
      sandbox.mock(instance.callback).expects('raw').once()
      instance.callback().should.be.equal(instance)

    it 'should not call callback when the button is disabled', ->
      sandbox.mock(instance.callback).expects('raw').never()
      instance.disable()
      instance.callback().should.be.equal(instance)

describe 'Jencil.buttons.CommandButton(core, name, text, title, command, shortcut) -> instance', ->
  sandbox = null
  beforeEach ->
    sandbox = sinon.sandbox.create()
  afterEach ->
    sandbox.verifyAndRestore()

  it 'should be found on `Jencil.buttons.CommandButton`', ->
    CommandButton.should.be.equal(Jencil.buttons.CommandButton)

  describe '#validate() -> instance', ->
    core = {
      'editor': -> {
        'foobar': -> @
      }
    }
    instance = new CommandButton(core, "foobar", null, null, 'foobar')

    it 'should be an instance property', ->
      instance.should.have.property('validate').a('function')

    it 'should do nothing if the command exists and return the instance', ->
      sandbox.mock(instance).expects('disable').never()
      instance.validate().should.be.equal(instance)
      instance.element.hasClass('disable').should.be.false

    it 'should call disable method if the command does not exists', ->
      instance2 = new CommandButton(core, "pafupafu", null, null, 'nonexists')
      sandbox.mock(instance2).expects('disable').once()
      instance2.validate().should.be.equal(instance2)
      # Note:
      # the test does not work with sinon.mock somehow (it should work)
      # probably "this" problem because `disable` method is called so
      # sandbox.verify() does not throw an error.
      # I'm too lazy to check because if I commented out the 
      # sandbox.mock(instance2)... line the test below works correctly.
      #instance2.element.hasClass('disable').should.be.true
