class NotImplementedError
  name: 'Not implemeted error'
  message: 'The function has not implemented yet'


class Originator
  createMemento: ->
    throw new NotImplementedError

  setMemento: (memento) ->
    throw new NotImplementedError


class Caretaker
  constructor: (originator) ->
    @_originator = originator
    @_undoStack = []
    @_redoStack = []

  originator: (originator) ->
    if originator?
      @_originator = originator
      return @
    return @_originator

  save: (memento) ->
    memento = memento or @originator().createMemento()
    @_undoStack.push memento
    @_redoStack = []
    return @

  undo: ->
    return false if not @canUndo()
    originator = @originator()
    # Get current memento of the originator
    # and store on `_redoStack` for redo
    @_redoStack.push originator.createMemento()
    # Get previous memento and set it to the originator
    originator.setMemento @_undoStack.pop()
    originator.focus?()
    return true

  redo: ->
    return false if not @canRedo()
    originator = @originator()
    # Get current memento of the originator
    # and store on `_undoStack` for undo
    @_undoStack.push originator.createMemento()
    # Get next memento and set it to the originator
    originator.setMemento @_redoStack.pop()
    originator.focus?()
    return true

  canUndo: ->
    return @_undoStack.length > 0

  canRedo: ->
    return @_redoStack.length > 0


if exports?
  exports.NotImplementedError = NotImplementedError
  exports.Originator = Originator
  exports.Caretaker = Caretaker
