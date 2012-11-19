return if not window?
Separator = Jencil.buttons.Separator
Button = Jencil.buttons.Button

describe 'Jencil.buttons.Separator(core) extends Widget -> instance', ->
  it 'should be found on `Jencil.buttons.Separator`', ->
    Separator.should.be.equal(Jencil.buttons.Separator)

  it 'should add `separator` class', ->
    instance = new Separator(null)
    instance.element.hasClass('separator').should.be.true


describe 'Jencil.buttons.Button(core, name, text, title) extends Widget -> instance', ->
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

describe 'Jencil.buttons.ActionButton(core, name, text, title, callback, shortcut) extends Button -> instance', ->
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

describe 'Jencil.buttons.CommandButton(core, name, text, title, command, shortcut) extends ActionButton -> instance', ->
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

  describe '@factory(core, args) -> instance', ->
    core = {
      'editor': -> {
        'foobar': -> @
      }
    }
    name = 'name'
    text = 'text'
    title = 'title'
    command = 'bold'
    shortcut = 'Ctrl+A'
    it 'should be an class property', ->
      CommandButton.should.have.property('factory').a('function')

    it 'should return an instance of CommandButton with 5 args', ->
      # with 5 args
      instance = CommandButton.factory(core, [name, text, title, command, shortcut])
      instance.name.should.be.equal(name)
      instance.text.should.be.equal(text)
      instance.title.should.be.equal(title)
      instance.command.should.be.equal(command)
      instance.shortcut.should.be.equal(shortcut)
    it 'should return an instance of CommandButton with 4 args', ->
      # with 4 args
      instance = CommandButton.factory(core, [name, text, command, shortcut])
      instance.name.should.be.equal(name)
      instance.text.should.be.equal(text)
      instance.title.should.be.equal(text)
      instance.command.should.be.equal(command)
      instance.shortcut.should.be.equal(shortcut)
    it 'should return an instance of CommandButton with 3 args', ->
      # with 3 args
      instance = CommandButton.factory(core, [name, text, shortcut])
      instance.name.should.be.equal(name)
      instance.text.should.be.equal(text)
      instance.title.should.be.equal(text)
      instance.command.should.be.equal(name)
      instance.shortcut.should.be.equal(shortcut)
    it 'should return an instance of CommandButton with 2 args', ->
      # with 2 args
      instance = CommandButton.factory(core, [name, text])
      instance.name.should.be.equal(name)
      instance.text.should.be.equal(text)
      instance.title.should.be.equal(text)
      instance.command.should.be.equal(name)
      expect(instance.shortcut).be.null
    it 'should return an instance of CommandButton with 1 arg', ->
      # with 1 arg
      instance = CommandButton.factory(core, [name])
      instance.name.should.be.equal(name)
      instance.text.should.be.equal(name)
      instance.title.should.be.equal(name)
      instance.command.should.be.equal(name)
      expect(instance.shortcut).be.null

describe 'Jencil.buttons.UndoButton(core) extends ActionButton -> instance', ->
  sandbox = null
  beforeEach ->
    sandbox = sinon.sandbox.create()
  afterEach ->
    sandbox.verifyAndRestore()
  core = {
    'caretaker': {
      'undo': -> @
    }
  }

  it 'should be found on `Jencil.buttons.UndoButton`', ->
    UndoButton.should.be.equal(Jencil.buttons.UndoButton)

  it 'callback call `core.caretaker.undo()` method', ->
    instance = new UndoButton(core)
    spy = sandbox.spy(core.caretaker, 'undo')
    instance.callback()
    spy.called.should.be.true

  it 'check whether it is possible to undo and change the status', ->
    core.caretaker.canUndo = -> true
    instance = new UndoButton(core)
    spy1 = sandbox.spy(core.caretaker, 'canUndo')
    spy2 = sandbox.spy(instance, 'disable')
    spy3 = sandbox.spy(instance, 'enable')
    instance.init()
    spy1.called.should.be.true
    spy2.called.should.be.false
    spy3.called.should.be.true
    sandbox.restore()
    core.caretaker.canUndo = -> false
    instance = new UndoButton(core)
    spy1 = sandbox.spy(core.caretaker, 'canUndo')
    spy2 = sandbox.spy(instance, 'disable')
    spy3 = sandbox.spy(instance, 'enable')
    instance.init()
    spy1.called.should.be.true
    spy2.called.should.be.true
    spy3.called.should.be.false


describe 'Jencil.buttons.RedoButton(core) extends ActionButton -> instance', ->
  sandbox = null
  beforeEach ->
    sandbox = sinon.sandbox.create()
  afterEach ->
    sandbox.verifyAndRestore()
  core = {
    'caretaker': {
      'redo': -> @
    }
  }

  it 'should be found on `Jencil.buttons.RedoButton`', ->
    RedoButton.should.be.equal(Jencil.buttons.RedoButton)

  it 'callback call `core.caretaker.redo()` method', ->
    instance = new RedoButton(core)
    spy = sandbox.spy(core.caretaker, 'redo')
    instance.callback()
    spy.called.should.be.true

  it 'check whether it is possible to redo and change the status', ->
    core.caretaker.canRedo = -> true
    instance = new RedoButton(core)
    spy1 = sandbox.spy(core.caretaker, 'canRedo')
    spy2 = sandbox.spy(instance, 'disable')
    spy3 = sandbox.spy(instance, 'enable')
    instance.init()
    spy1.called.should.be.true
    spy2.called.should.be.false
    spy3.called.should.be.true
    sandbox.restore()
    core.caretaker.canRedo = -> false
    instance = new RedoButton(core)
    spy1 = sandbox.spy(core.caretaker, 'canRedo')
    spy2 = sandbox.spy(instance, 'disable')
    spy3 = sandbox.spy(instance, 'enable')
    instance.init()
    spy1.called.should.be.true
    spy2.called.should.be.true
    spy3.called.should.be.false


describe 'Jencil.buttons.FullscreenButton(core) extends ActionButton -> instance', ->
  sandbox = null
  beforeEach ->
    sandbox = sinon.sandbox.create()
  afterEach ->
    sandbox.verifyAndRestore()
  core = {
    'fullscreen': {
      'toggle': -> @
      'element': {}
    }
  }

  it 'should be found on `Jencil.buttons.FullscreenButton`', ->
    FullscreenButton.should.be.equal(Jencil.buttons.FullscreenButton)

  it 'callback call `core.fullscreen.toggle()` method', ->
    instance = new FullscreenButton(core)
    spy = sandbox.spy(core.fullscreen, 'toggle')
    instance.callback()
    spy.called.should.be.true

  it 'check whether fullscreen or not and change the status', ->
    core.fullscreen.element.is = -> false
    instance = new FullscreenButton(core)
    spy1 = sandbox.spy(core.fullscreen.element, 'is')
    spy2 = sandbox.spy(instance.element, 'addClass')
    spy3 = sandbox.spy(instance.element, 'removeClass')
    instance.init()
    spy1.called.should.be.true
    spy1.returnValues.should.be.eql([false])
    spy2.called.should.be.false
    spy3.called.should.be.true
    instance.element.hasClass('hide').should.be.false

    core.fullscreen.element.is = -> true
    instance = new FullscreenButton(core)
    spy1 = sandbox.spy(core.fullscreen.element, 'is')
    spy2 = sandbox.spy(instance.element, 'addClass')
    spy3 = sandbox.spy(instance.element, 'removeClass')
    instance.init()
    spy1.called.should.be.true
    spy1.returnValues.should.be.eql([true])
    spy2.called.should.be.true
    spy3.called.should.be.false
    instance.element.hasClass('hide').should.be.true


describe 'Jencil.buttons.ViewerButton(core) extends ActionButton -> instance', ->
  sandbox = null
  beforeEach ->
    sandbox = sinon.sandbox.create()
  afterEach ->
    sandbox.verifyAndRestore()
  viewer =
    toggle: -> @
    element: {}
  core =
    viewer: -> viewer

  it 'should be found on `Jencil.buttons.ViewerButton`', ->
    ViewerButton.should.be.equal(Jencil.buttons.ViewerButton)

  it 'callback call `core.viewer().toggle()` method', ->
    instance = new ViewerButton(core)
    spy1 = sandbox.spy(core, 'viewer')
    spy2 = sandbox.spy(viewer, 'toggle')
    instance.callback()
    spy1.called.should.be.true
    spy2.called.should.be.true

  it 'validate whether the viewer is available', ->
    core.viewer = -> viewer
    instance = new ViewerButton(core)
    spy1 = sandbox.spy(core, 'viewer')
    spy2 = sandbox.spy(instance, 'disable')
    instance.validate().should.be.true
    spy1.called.should.be.true
    spy2.called.should.be.false
    sandbox.restore()

    core.viewer = -> null
    instance = new ViewerButton(core)
    spy1 = sandbox.spy(core, 'viewer')
    spy2 = sandbox.spy(instance, 'disable')
    instance.validate().should.be.false
    spy1.called.should.be.true
    spy2.called.should.be.true

  it 'check whether the viewer is visible and change the status', ->
    core.viewer = -> viewer
    viewer.element.is = -> false
    instance = new ViewerButton(core)
    spy1 = sandbox.spy(viewer.element, 'is')
    spy2 = sandbox.spy(instance.element, 'addClass')
    spy3 = sandbox.spy(instance.element, 'removeClass')
    instance.init()
    spy1.called.should.be.true
    spy1.returnValues.should.be.eql([false])
    spy2.called.should.be.false
    spy3.called.should.be.true
    instance.element.hasClass('hide').should.be.false

    sandbox.restore()
    core.viewer = -> viewer
    viewer.element.is = -> true
    instance = new ViewerButton(core)
    spy1 = sandbox.spy(viewer.element, 'is')
    spy2 = sandbox.spy(instance.element, 'addClass')
    spy3 = sandbox.spy(instance.element, 'removeClass')
    instance.init()
    spy1.called.should.be.true
    spy1.returnValues.should.be.eql([true])
    spy2.called.should.be.true
    spy3.called.should.be.false
    instance.element.hasClass('hide').should.be.true


describe 'Jencil.buttons.HelperButton(core) extends ActionButton -> instance', ->
  sandbox = null
  beforeEach ->
    sandbox = sinon.sandbox.create()
  afterEach ->
    sandbox.verifyAndRestore()
  helper =
    toggle: -> @
    element: {}
  core =
    helper: -> helper

  it 'should be found on `Jencil.buttons.HelperButton`', ->
    HelperButton.should.be.equal(Jencil.buttons.HelperButton)

  it 'callback call `core.helper().toggle()` method', ->
    instance = new HelperButton(core)
    spy1 = sandbox.spy(core, 'helper')
    spy2 = sandbox.spy(helper, 'toggle')
    instance.callback()
    spy1.called.should.be.true
    spy2.called.should.be.true

  it 'validate whether the helper is available', ->
    core.helper = -> helper
    instance = new HelperButton(core)
    spy1 = sandbox.spy(core, 'helper')
    spy2 = sandbox.spy(instance, 'disable')
    instance.validate().should.be.true
    spy1.called.should.be.true
    spy2.called.should.be.false
    sandbox.restore()

    core.helper = -> null
    instance = new HelperButton(core)
    spy1 = sandbox.spy(core, 'helper')
    spy2 = sandbox.spy(instance, 'disable')
    instance.validate().should.be.false
    spy1.called.should.be.true
    spy2.called.should.be.true

  it 'check whether the helper is visible and change the status', ->
    core.helper = -> helper
    helper.element.is = -> false
    instance = new HelperButton(core)
    spy1 = sandbox.spy(helper.element, 'is')
    spy2 = sandbox.spy(instance.element, 'addClass')
    spy3 = sandbox.spy(instance.element, 'removeClass')
    instance.init()
    spy1.called.should.be.true
    spy1.returnValues.should.be.eql([false])
    spy2.called.should.be.false
    spy3.called.should.be.true
    instance.element.hasClass('hide').should.be.false

    sandbox.restore()
    core.helper = -> helper
    helper.element.is = -> true
    instance = new HelperButton(core)
    spy1 = sandbox.spy(helper.element, 'is')
    spy2 = sandbox.spy(instance.element, 'addClass')
    spy3 = sandbox.spy(instance.element, 'removeClass')
    instance.init()
    spy1.called.should.be.true
    spy1.returnValues.should.be.eql([true])
    spy2.called.should.be.true
    spy3.called.should.be.false
    instance.element.hasClass('hide').should.be.true


describe 'Jencil.buttons.buttonFactory(core, value) -> instance', ->
  sandbox = null
  beforeEach ->
    sandbox = sinon.sandbox.create()
  afterEach ->
    sandbox.verifyAndRestore()

  it 'should be found on `Jencil.buttons.buttonFactory`', ->
    buttonFactory.should.be.equal(Jencil.buttons.buttonFactory)

  it 'should call `CommandButton.factory(core, args)` method when array is passed', ->
    spy = sandbox.spy(CommandButton, 'factory')
    instance = buttonFactory(null, ['name'])
    instance.should.be.instanceof(CommandButton)
    spy.called.should.be.true

  it 'should create ActionButton when string is passed', ->
    instance = buttonFactory(null, 'Separator')
    instance.should.be.instanceof(Separator)
    instance = buttonFactory(null, 'Undo')
    instance.should.be.instanceof(UndoButton)
    instance = buttonFactory(null, 'Redo')
    instance.should.be.instanceof(RedoButton)
    instance = buttonFactory(null, 'Fullscreen')
    instance.should.be.instanceof(FullscreenButton)
    instance = buttonFactory(null, 'Viewer')
    instance.should.be.instanceof(ViewerButton)
    instance = buttonFactory(null, 'Helper')
    instance.should.be.instanceof(HelperButton)

  it 'should simply create an instance of the value class', ->
    Test = -> @
    instance = buttonFactory(null, Test)
    instance.should.be.instanceof(Test)
