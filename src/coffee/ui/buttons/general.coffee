class UndoButton extends ActionButton
  constructor: (core) ->
    callback = (e) =>
      @core.caretaker.undo()
    check = =>
      if not @core.caretaker.canUndo()
        @element.addClass 'disabled'
      else
        @element.removeClass 'disabled'
      setTimeout check, 100
    super core, 'undo', 'Undo', callback, 'Ctrl+Z'
    check()


class RedoButton extends ActionButton
  constructor: (core) ->
    callback = (e) =>
      @core.caretaker.redo()
    check = =>
      if not @core.caretaker.canRedo()
        @element.addClass 'disabled'
      else
        @element.removeClass 'disabled'
      setTimeout check, 100
    super core, 'redo', 'Redo', callback, 'Ctrl+Shift+Z'
    check()


class FullscreenButton extends ActionButton
  constructor: (core) ->
    callback = (e) =>
      if @core.fullscreen.element.is(':visible')
        @core.fullscreen.hide()
        @element.removeClass 'hide'
      else
        @core.fullscreen.show()
        @element.addClass 'hide'
    super core, 'fullscreen', 'Toggle fullscreen', callback, 'Ctrl+F'


class PreviewButton extends ActionButton
  constructor: (core) ->
    callback = (e) =>
      viewer = @core.getViewer()
      if not viewer.element.is(':visible')
        @element.addClass 'hide'
      else
        @element.removeClass 'hide'
      @core.wrapper.workspace.toggleViewer()
    super core, 'preview', 'Toggle preview', callback, 'Ctrl+P'

  init: ->
    if @core.wrapper.workspace.mainPanel.splitter.defaultValue == 0
      @element.addClass 'hide'
    else
      @element.removeClass 'hide'

class ConfigButton extends ActionButton
  constructor: (core) ->
    callback = (e) =>
      viewer = @core.getViewer()
      if not viewer.element.is(':visible')
        @element.addClass 'hide'
      else
        @element.removeClass 'hide'
      @core.wrapper.workspace.toggleViewer()
    super core, 'preview', 'Toggle preview', callback, 'Ctrl+P'

  init: ->
    if @core.wrapper.workspace.mainPanel.splitter.defaultValue == 0
      @element.addClass 'hide'
    else
      @element.removeClass 'hide'
      
class JencilButton extends ActionButton
  constructor: (core) ->
    callback = (e) =>
      viewer = @core.getViewer()
      if not viewer.element.is(':visible')
        @element.addClass 'hide'
      else
        @element.removeClass 'hide'
      @core.wrapper.workspace.toggleViewer()
    super core, 'preview', 'Toggle preview', callback, 'Ctrl+P'

  init: ->
    if @core.wrapper.workspace.mainPanel.splitter.defaultValue == 0
      @element.addClass 'hide'
    else
      @element.removeClass 'hide'
