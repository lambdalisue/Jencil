return if not window?
Wrapper = Jencil.workspace.Wrapper
Workspace = Jencil.workspace.Workspace
Bar = Jencil.workspace.Bar
Toolbar = Jencil.workspace.Toolbar
Statusbar = Jencil.workspace.Statusbar


if not Object.create?
  Object.create = (obj) ->
    F = -> @
    F.prototype = obj
    return new F

describe 'Jencil.workspace.Wrapper(core, width, height) extends Panel -> instance', ->
  sandbox = null
  core =
    options:
      resizable: true
    editor: -> @_editor
    _editor:
      curtain:
        on: -> @
        off: -> @
        refresh: -> @
    viewer: -> @_viewer
    _viewer:
      curtain:
        on: -> @
        off: -> @
        refresh: -> @
    helper: -> @_helper
    _helper:
      curtain:
        on: -> @
        off: -> @
        refresh: -> @
  beforeEach ->
    sandbox = sinon.sandbox.create()
  afterEach ->
    sandbox.verifyAndRestore()

  it 'should be found on `Jencil.workspace.Wrapper`', ->
    Wrapper.should.be.equal(Jencil.workspace.Wrapper)

  it 'should add `jencil wrapper` class', ->
    instance = new Wrapper(null, 0, 0)
    instance.element.hasClass('jencil').should.be.true
    instance.element.hasClass('wrapper').should.be.true

  it 'should set element width/height', ->
    instance = new Wrapper(null, 100, 200)
    instance.element.width().should.be.equal(100)
    instance.element.height().should.be.equal(200)

  it 'should create Workspace instance and store it', ->
    instance = new Wrapper(null, 100, 200)
    instance.workspace.should.be.instanceof(Workspace)
    instance.element.children().length.should.be.equal(1)

  describe '#curtain.on()', ->
    instance = new Wrapper(core, 0, 0)

    it 'should be an instance property', ->
      instance.should.have.property('curtain').a('object')
      instance.curtain.should.have.property('on').a('function')

    it 'should call `curtain.on()` method of each panel if it exists', ->
      c = Object.create(core)
      instance = new Wrapper(c, 0, 0)
      sandbox.mock(instance).expects('adjust').returns(null).once()
      spy1 = sandbox.spy(core._editor.curtain, 'on')
      spy2 = sandbox.spy(core._viewer.curtain, 'on')
      spy3 = sandbox.spy(core._helper.curtain, 'on')
      instance.curtain.on()
      spy1.called.should.be.true
      spy2.called.should.be.true
      spy3.called.should.be.true

  describe '#curtain.off()', ->
    instance = new Wrapper(core, 0, 0)

    it 'should be an instance property', ->
      instance.should.have.property('curtain').a('object')
      instance.curtain.should.have.property('off').a('function')

    it 'should call `curtain.off()` method of each panel if it exists', ->
      c = Object.create(core)
      instance = new Wrapper(c, 0, 0)
      sandbox.mock(instance).expects('adjust').returns(null).once()
      spy1 = sandbox.spy(core._editor.curtain, 'off')
      spy2 = sandbox.spy(core._viewer.curtain, 'off')
      spy3 = sandbox.spy(core._helper.curtain, 'off')
      instance.curtain.off()
      spy1.called.should.be.true
      spy2.called.should.be.true
      spy3.called.should.be.true

  describe '#curtain.refresh()', ->
    instance = new Wrapper(core, 0, 0)

    it 'should be an instance property', ->
      instance.should.have.property('curtain').a('object')
      instance.curtain.should.have.property('refresh').a('function')

    it 'should call `curtain.off()` method of each panel if it exists', ->
      c = Object.create(core)
      instance = new Wrapper(c, 0, 0)
      sandbox.mock(instance).expects('adjust').returns(null).once()
      spy1 = sandbox.spy(core._editor.curtain, 'refresh')
      spy2 = sandbox.spy(core._viewer.curtain, 'refresh')
      spy3 = sandbox.spy(core._helper.curtain, 'refresh')
      instance.curtain.refresh()
      spy1.called.should.be.true
      spy2.called.should.be.true
      spy3.called.should.be.true

  describe '#init(profileNameOrInstance) -> instance', ->
    instance = new Wrapper(core, 0, 0)

    it 'should be an instance property', ->
      instance.should.have.property('init').a('function')

    if jQuery::resizable?
      it 'should call `element.resizable()` if options.resizable is true', ->
        spy = sandbox.spy(instance.element, 'resizable')
        sandbox.stub(instance.workspace, 'profile')
        sandbox.stub(instance.workspace, 'init')
        instance.init('Html').should.be.equal(instance)
        spy.called.should.be.true

    it 'should call `workspace.profile(profileNameOrInstance)` method', ->
        sandbox.mock(instance.workspace).expects('profile').withArgs('Html').once()
        sandbox.stub(instance.workspace, 'init')
        instance.init('Html').should.be.equal(instance)

    it 'should call `workspace.init()` method', ->
        sandbox.stub(instance.workspace, 'profile')
        sandbox.mock(instance.workspace).expects('init').once()
        instance.init('Html').should.be.equal(instance)

  describe '#adjust() -> instance', ->
    instance = new Wrapper(core, 100, 200)

    it 'should be an instance property', ->
      instance.should.have.property('adjust').a('function')

    it 'should set workspace outerWidth/outerHeight as equal as element width/height', ->
      sandbox.stub(instance.workspace, 'adjust')
      instance.workspace.element.outerWidth().should.not.be.equal(100)
      instance.workspace.element.outerHeight().should.not.be.equal(200)
      instance.adjust().should.be.equal(instance)
      instance.workspace.element.outerWidth().should.be.equal(100)
      instance.workspace.element.outerHeight().should.be.equal(200)

    it 'should call `workspace.adjust` method', ->
      sandbox.mock(instance.workspace).expects('adjust').once()
      instance.adjust().should.be.equal(instance)
