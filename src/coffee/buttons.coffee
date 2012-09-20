class Separator extends Widget
  constructor: (core) ->
    super core, '<span>'
    @element.addClass 'separator'


class Button extends Widget
  constructor: (core, @name, @text, @title) ->
    super core, '<a>'
    @text = Jencil.t(@text or @name)
    @title = Jencil.t(@title or @text)
    @element.addClass('button').addClass(name)
    @element.append($("<span>#{@text}</span>"))
    @element.attr 'title', @title

  enable: ->
    @element.removeClass 'disable'

  disable: ->
    @element.addClass 'disable'

  validate: -> @


class ActionButton extends Button
  constructor: (core, name, text, title, callback, @shortcut) ->
    super core, name, text, title
    @callback = =>
      callback() if not @element.hasClass('disable')
    @callback.raw = callback
    @element.click => @callback()

    if @shortcut? and window.shortcut?
      # it require `shortcut.js`
      window.shortcut.add @shortcut, (e) => @callback()
      @element.attr 'title', "#{@title} (#{@shortcut})"


class CommandButton extends ActionButton
  constructor: (core, name, text, title, @command, shortcut) ->
    callback = ->
      editor = core.editor()
      editor[command].call(editor)
    super core, name, text, title, callback, shortcut

  init: ->
    @validate()

  validate: ->
    editor = @core.editor()
    if not editor[@command]?
      @disable()
    return @

  @factory: (core, args) ->
    name = text = title = command = shortcut = null
    switch args.length
      when 5
        name = args[0]
        text = args[1]
        title = args[2]
        command = args[3]
        shortcut = args[4]
      when 4
        name = args[0]
        text = title = args[1]
        command = args[2]
        shortcut = args[3]
      when 3
        name = command = args[0]
        text = title = args[1]
        shortcut = args[2]
      when 2
        name = command = args[0]
        text = title = args[1]
        shortcut = null
      when 1
        name = command = text = title = args[0]
        shortcut = null
    return new CommandButton(core, name, text, title, command, shortcut)


class UndoButton extends ActionButton
  constructor: (core) ->
    callback = (e) =>
      @core.caretaker.undo()
    super core, 'undo', 'Undo', 'Undo', callback, 'Ctrl+Z'

  init: ->
    check = =>
      if not @core.caretaker.canUndo()
        @disable()
      else
        @enable()
      setTimeout check, 100
    check()


class RedoButton extends ActionButton
  constructor: (core) ->
    callback = (e) =>
      @core.caretaker.redo()
    super core, 'redo', 'Redo', 'Redo', callback, 'Ctrl+Shift+Z'

  init: ->
    check = =>
      if not @core.caretaker.canRedo()
        @disable()
      else
        @enable()
      setTimeout check, 100
    check()


class FullscreenButton extends ActionButton
  constructor: (core) ->
    callback = (e) =>
      @core.fullscreen.toggle()
    super core, 'fullscreen', 'Toggle fullscreen', 'Fullscreen', callback, 'Ctrl+F' # Fullscreen

  init: ->
    check = =>
      if @core.fullscreen.element.is(':visible')
        @element.addClass 'hide'
      else
        @element.removeClass 'hide'
      setTimeout check, 100
    check()


class ViewerButton extends ActionButton
  constructor: (core) ->
    callback = (e) =>
      @core.viewer().toggle()
    super core, 'viewer', 'Quick view', 'Quick view', callback, 'Ctrl+Q' # Quick view

  validate: ->
    if not @core.viewer()
      @disable()
      return false
    return true

  init: ->
    return if not @validate()
    check = =>
      if @core.viewer().element.is(':visible')
        @element.addClass 'hide'
      else
        @element.removeClass 'hide'
      setTimeout check, 100
    check()


class HelperButton extends ActionButton
  constructor: (core) ->
    callback = (e) =>
      @core.helper().toggle()
    super core, 'helper', 'Help', 'Help', callback, 'Ctrl+H' # Help

  validate: ->
    if not @core.helper()
      @disable()
      return false
    return true

  init: ->
    return if not @validate()
    check = =>
      if @core.helper().element.is(':visible')
        @element.addClass 'hide'
      else
        @element.removeClass 'hide'
      setTimeout check, 100
    check()

buttonFactory = (core, value) ->
  if value instanceof Array
    # CommandButton
    return CommandButton.factory(core, value)
  if typeof value is 'string'
    # ActionButton
    switch value
      when 'Separator' then return new Separator(core)
      when 'Undo' then return new UndoButton(core)
      when 'Redo' then return new RedoButton(core)
      when 'Fullscreen' then return new FullscreenButton(core)
      when 'Viewer' then return new ViewerButton(core)
      when 'Helper' then return new HelperButton(core)
      else
        throw new Exception("#{value} is not known Button type")
  # probably value is a class of Button
  return new value(core)

namespace 'Jencil.ui.widgets.buttons', (exports) ->
  exports.Separator = Separator
  exports.Button = Button
  exports.ActionButton = ActionButton
  exports.CommandButton = CommandButton
  exports.UndoButton = UndoButton
  exports.RedoButton = RedoButton
  exports.FullscreenButton = FullscreenButton
  exports.ViewerButton = ViewerButton
  exports.HelperButton = HelperButton
