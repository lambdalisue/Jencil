class Originator
  createMemento: ->
    throw new Error("NotImplementedError")

  setMemento: (memento) ->
    throw new Error("NotImplementedError")

  ### DEBUG--- ###
  @validate: (instance) ->
    if not instance.createMemento?
      throw new Error("Originator instance need `createMemento` method")
    if not instance.setMemento?
      throw new Error("Originator instance need `setMemento` method")
  ### ---DEBUG ###


class Caretaker
  constructor: (originator) ->
    @_originator = originator
    @_undoStack = []
    @_redoStack = []

  originator: (originator) ->
    if originator?
      ### DEBUG--- ###
      # validate the originator instance
      Originator.validate(originator)
      ### ---DEBUG ###
      @_originator = originator
      return @
    return originator

  save: (memento) ->
    memento = memento or @originator().createMemento()
    @_undoStack.push memento
    @_redoStack = []

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
