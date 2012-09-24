return if not window?
# Imports
autoIndentable = Jencil.utils.autoindent.autoIndentable
Selection = Jencil.utils.selection.Selection

describe 'Jencil.utils.autoindent.autoIndentable(textarea, pre, post) -> AutoIndentableObj', ->
  textarea = instance = null

  before ->
    textarea = $(sandbox.createElement('textarea'))
    instance = autoIndentable(textarea)

  after ->
    sandbox.removeAllChildren()

  beforeEach ->
    instance.val '001122\n  bbcc\n    CC'

  it 'should have selection instance', ->
    instance.should.have.property('selection').instanceof(Selection)

  describe '#autoIndent(e) -> instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('autoIndent').a('function')

    it 'should add new line when the pressed key is RETURN', ->
      instance.val '001122\n  bbcc\n    CC'
      # Create Event class to simulate
      e = jQuery.Event('keydown')
      e.which = 13  # RETURN
      # Set caret position
      instance.selection.caret(6)
      # Simulate
      instance.autoIndent(e)
      instance.val().should.be.equal("001122\n\n  bbcc\n    CC")

    it 'should add new line and leading tabs when the pressed key is RETURN', ->
      instance.val '001122\n\tbbcc\n\t\tCC'
      # Create Event class to simulate
      e = jQuery.Event('keydown')
      e.which = 13  # RETURN
      # Set caret position
      instance.selection.caret(12)
      # Simulate
      instance.autoIndent(e)
      instance.val().should.be.equal("001122\n\tbbcc\n\t\n\t\tCC")
      # Reset
      instance.val '001122\n\tbbcc\n\t\tCC'
      # Set caret position
      instance.selection.caret(17)
      # Simulate
      instance.autoIndent(e)
      instance.val().should.be.equal("001122\n\tbbcc\n\t\tCC\n\t\t")

    it 'should add new line and leading spaces when the pressed key is RETURN', ->
      instance.val '001122\n  bbcc\n    CC'
      # Create Event class to simulate
      e = jQuery.Event('keydown')
      e.which = 13  # RETURN
      # Set caret position
      instance.selection.caret(13)
      # Simulate
      instance.autoIndent(e)
      instance.val().should.be.equal("001122\n  bbcc\n  \n    CC")

      # Reset val
      instance.val '001122\n  bbcc\n    CC'
      # Set caret position
      instance.selection.caret(20)
      # Simulate
      instance.autoIndent(e)
      instance.val().should.be.equal("001122\n  bbcc\n    CC\n    ")

  describe '#autoIndent.enable() -> instance', ->
    it 'should be an instance property', ->
      instance.autoIndent.should.have.property('enable').a('function')

    it 'should enable auto indent feature and the instance', sinon.test ->
      # Create sinon spy
      mock = @mock(instance).expects('autoIndent').once()
      # Disable and Enable
      instance.autoIndent.disable()
      instance.autoIndent.enable().should.be.equal(instance)
      # Create Event class to simulate
      e = jQuery.Event('keydown')
      e.which = 13  # RETURN
      # Simulate keydown event
      instance.trigger(e)
      # autoIndent should have called once with KeyDown event
      mock.verify()


  describe '#autoIndent.disable() -> instance', ->
    it 'should be an instance property', ->
      instance.autoIndent.should.have.property('disable').a('function')

    it 'should disable auto indent feature and the instance', sinon.test ->
      # Create sinon spy
      mock = @mock(instance).expects('autoIndent').never()
      # Enable and Disable
      instance.autoIndent.enable()
      instance.autoIndent.disable().should.be.equal(instance)
      # Create Event class to simulate
      e = jQuery.Event('keydown')
      e.which = 13  # RETURN
      # Simulate keydown event
      instance.trigger(e)
      # autoIndent should have never called with KeyDown event
      mock.verify()
      # clean
      instance.autoIndent.enable()


  describe '#autoIndent.pre(e, line) -> instance', ->
    it 'should not exists if nothing has specified', ->
      instance.autoIndent.should.not.have.property('pre')

    it 'should exists if pre callback has specified', ->
      dummy = -> @
      instance2 = autoIndentable(textarea, dummy)
      instance2.autoIndent.should.have.property('pre').a('function')
      # Note: the line below fail because pre callback is wrapped
      #instance2.autoIndent.pre.should.be.equal(dummy)

    it 'should called before new line and leading spaces are added', sinon.test ->
      instance2 = autoIndentable(textarea, -> @)
      pspy = @spy(instance2.autoIndent, 'pre')
      aspy = @spy(instance2.selection, 'insertAfter')
      # Create Event class to simulate
      e = jQuery.Event('keydown')
      e.which = 13  # RETURN
      # Simulate autoIndent
      instance2.autoIndent(e)
      pspy.calledBefore(aspy).should.be.true

  describe '#autoIndent.post(e, line, indent, insert) -> instance', ->
    it 'should not exists if nothing has specified', ->
      instance.autoIndent.should.not.have.property('post')

    it 'should exists if pre callback has specified', ->
      dummy = -> @
      instance2 = autoIndentable(textarea, null, dummy)
      instance2.autoIndent.should.have.property('post').a('function')
      # Note: the line below fail because post callback is wrapped
      #instance2.autoIndent.post.should.be.equal(dummy)

    it 'should called after new line and leading spaces are added', sinon.test ->
      instance2 = autoIndentable(textarea, null, -> @)
      aspy = @spy(instance2.selection, 'insertAfter')
      pspy = @spy(instance2.autoIndent, 'post')
      # Create Event class to simulate
      e = jQuery.Event('keydown')
      e.which = 13  # RETURN
      # Simulate keydown event
      instance2.autoIndent(e)
      pspy.calledAfter(aspy).should.be.true
