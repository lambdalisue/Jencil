if not window?
  undo = require '../../../src/js/utils/undo.js'
  NotImplementedError = undo.NotImplementedError
  Originator = undo.Originator
  Caretaker = undo.Caretaker

describe 'utils.undo.Originator():Abstract => object', ->
  instance = new Originator()

  describe '#createMemento() => object', ->
    it 'should be an instance property', ->
      instance.should.have.property('createMemento').a('function')

    it 'should throw NotImplementedError', ->
      instance.createMemento.should.throw(NotImplementedError)

  describe '#setMemento() => object', ->
    it 'should be an instance property', ->
      instance.should.have.property('setMemento').a('function')

    it 'should throw NotImplementedError', ->
      instance.setMemento.should.throw(NotImplementedError)


describe 'utils.undo.Caretaker(originator) => object', ->
  class FakeOriginator extends Originator
    constructor: ->
      @counter = 0

    createMemento: ->
      return @counter

    setMemento: (memento) ->
      @counter = memento
      return @

    increment: ->
      @counter += 1

  originator = instance = null

  beforeEach ->
    originator = new FakeOriginator()
    instance = new Caretaker(originator)

  describe '#originator(originator) => instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('originator').a('function')

    it 'should return originator instance', ->
      instance.originator().should.be.equal(originator)

    it 'should set originator and return the instance', ->
      instance.originator("fake").should.be.equal(instance)
      instance.originator().should.be.equal("fake")

  describe '#save(memento) => instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('save').a('function')

    it 'should save the memento and return the instance', ->
      instance.save("fake").should.be.equal(instance)
      instance._undoStack.length.should.be.equal(1)
      instance._undoStack[0].should.be.equal("fake")

    it 'should save the current memento of the originator and return the instance', ->
      originator.increment()  # 1
      instance.save().should.be.equal(instance)
      instance._undoStack.length.should.be.equal(1)
      instance._undoStack[0].should.be.equal(1)

  describe '#undo() -> bool', ->
    it 'should be an instance property', ->
      instance.should.have.property('undo').a('function')

    it 'should return false if no backward mementos has saved', ->
      instance.undo().should.be.equal(false)

    it 'should return true and change the statement of originator', ->
      instance.save()         # 0
      originator.increment()  # 1
      instance.undo().should.be.equal(true)
      originator.counter.should.be.equal(0)

  describe '#redo() -> bool', ->
    it 'should be an instance property', ->
      instance.should.have.property('redo').a('function')

    it 'should return false if no forward mementos has saved', ->
      instance.redo().should.be.equal(false)

    it 'should return true and change the statement of originator', ->
      instance.save()         # 0
      originator.increment()  # 1
      instance.undo()         # 0
      instance.redo().should.be.equal(true)
      originator.counter.should.be.equal(1)

  describe '#canUndo() -> bool', ->
    it 'should be an instance property', ->
      instance.should.have.property('canUndo').a('function')

    it 'should return false if no backward mementos has saved', ->
      instance.canUndo().should.be.equal(false)

    it 'should return true if there are backward mementos', ->
      instance.save()
      instance.canUndo().should.be.equal(true)

  describe '#canRedo() -> bool', ->
    it 'should be an instance property', ->
      instance.should.have.property('canRedo').a('function')

    it 'should return false if no forward mementos has saved', ->
      instance.canRedo().should.be.equal(false)

    it 'should return true if there are forward mementos', ->
      instance.save()
      instance.undo()
      instance.canRedo().should.be.equal(true)
