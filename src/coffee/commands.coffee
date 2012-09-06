class CommandBase extends Command
  constructor: (@core, receiver, callback) ->
    super receiver, callback


class EditorCommand extends CommandBase
  constructor: (core, callback) ->
    super core, null, callback

  getReceiver: ->
    return @core.getEditor()
  

class EditorMarkupCommand extends EditorCommand
  constructor: (core, @name) ->
    super core, null

  getCallback: ->
    receiver = @getReceiver()
    return receiver[@name]
