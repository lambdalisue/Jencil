class Command
  constructor: (receiver, callback) ->
    @_receiver = receiver
    @_callback = callback or => @callback()

  callback: ->
    throw "NotImplementedError"

  getReceiver: ->
    return @_receiver

  getCallback: ->
    return @_callback

  invoke: ->
    receiver = @getReceiver()
    callback = @getCallback()
    @_prev = receiver.createMemento()
    callback.call(receiver)
    @_next = receiver.createMemento()

  undo: ->
    receiver = @getReceiver()
    receiver.setMemento(@_prev)

  redo: ->
    receiver = @getReceiver()
    receiver.setMemento(@_next)


class DummyCommand extends Command
  constructor: (receiver) ->
    super receiver, -> @

class Originator
  createMemento: ->
    throw "NotImplementedError"

  setMemento: (memento) ->
    throw "NotImplementedError"


class Caretaker
  constructor: ->
    @_undoStack = []
    @_redoStack = []

  invoke: (command) ->
    command.invoke()
    @_redoStack = []
    @_undoStack.push(command)

  undo: ->
    return false if not @canUndo()
    command = @_undoStack.pop()
    command.undo()
    @_redoStack.push(command)
    return true

  redo: ->
    return false if not @canRedo()
    command = @_redoStack.pop()
    command.redo()
    @_undoStack.push(command)
    return true

  canUndo: ->
    return @_undoStack.length > 0

  canRedo: ->
    return @_redoStack.length > 0


