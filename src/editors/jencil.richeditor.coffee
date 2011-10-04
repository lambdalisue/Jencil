###
Jencil RichEditor

A Dualpane WYSIWYG Editor with TextareaPane

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- Jencil.widget (jencil.widget.js)
- Jencil.editor (jencil.editor.js)
- Jencil.editor.pane (jencil.editor.pane.js)
- Jencil.editor.pane.TextareaPane (jencil.texteditor.js)
- Jencil.button (jencil.button.js)

Dependencies:
- Jencil.utils.detector (jencil.utils.js)
- Textarea (textarea.js)
###
namespace 'Jencil.editor.pane', (exports) ->
  EditorPane = Jencil.editor.pane.EditorPane
  exports.RichareaPane = class RichareaPane extends EditorPane
    constructor: (jencil, editor) ->
      super jencil, 'jencil-richarea-pane', editor
      @$element.css position: 'relative'
      @$surface = $('<iframe>').addClass 'surface'
      @$surface.appendTo @$element
      @$surface.css
        width: '100%'
        height: '100%'
        border: 'none'
        margin: 0
        padding: 0
      if @jencil.options.extras.richareaTemplatePath?
        src = @jencil.options.extras.richareaTemplatePath
        @$surface.attr 'src', Jencil.utils.path.abspath src
      if Jencil.utils.detector.browser is 'Explorer'
        # quickfix for IE border issue
        @$surface.attr 'frameborder', 0
      @controller = null
    init: ->
      @controller = new Richarea @$surface
      # Add construct code which will be called after richarea get ready
      @controller.ready =>
        @relocate()
        @$body = $(@controller.raw.body)
        @$body.css {margin: 0, padding: 0}
        @$body.bind 'keypress change click blur enter', =>
          @update()
        RichareaPane.__super__.init.call @
    relocate: ->
      super()
      # quickfix for IE 6 and 7, because they don't know '100%' mean.
      if Jencil.utils.detector.browser is 'Explorer' and Jencil.utils.detector.version < 8
        @$surface.height @$element.height()
      # quickfix for IE body height issue
      if Jencil.utils.detector.browser is 'Explorer' and Jencil.utils.detector.version < 9
        @$body.height @$surface.height()
    getValue: ->
      if @controller?.ready() then return @controller.getValue()
    setValue: (value) ->
      if @controller?.ready() then @controller.setValue value
namespace 'Jencil.editor', (exports) ->
  DualPaneEditorBase = Jencil.editor.DualPaneEditorBase
  TextareaPane = Jencil.editor.pane.TextareaPane
  RichareaPane = Jencil.editor.pane.RichareaPane
  exports.RichEditor = class RichEditor extends DualPaneEditorBase
    @extras:
      options:
        richareaTemplatePath: '~/extras/templates/richarea.html'
    constructor: (jencil) ->
      if jencil.options.extras.previewPosition in ['top', 'left']
        lhspane = @preview = new TextareaPane jencil, @
        rhspane = @richarea = new RichareaPane jencil, @
      else
        lhspane = @richarea = new RichareaPane jencil, @
        rhspane = @preview = new TextareaPane jencil, @
      super jencil, 'jencil-rich-editor', lhspane, rhspane
      @$element.addClass "jencil-preview-position-#{@jencil.options.extras.previewPosition}"
      @preview.hide() if @jencil.options.extras.defaultPreviewState is 'close'
    init: ->
      super()
      @richarea.controller.ready =>
        @setValue @jencil.getSourceValue()
        @preview.setValue @getValue()
        # Add event
        @richarea.update =>
          @jencil.setSourceValue @getValue()
          @preview.setValue @getValue()
        @preview.update =>
          @jencil.setSourceValue @preview.getValue()
          @richarea.setValue @preview.getValue()
        @update()
    getValue: ->
      @richarea.getValue()
    setValue: (value) ->
      @richarea.setValue value
# --- Add extra buttons for TextEditor
namespace 'Jencil.button', (exports) ->
  ButtonBase = Jencil.button.ButtonBase
  MarkupButtonBase = Jencil.button.MarkupButtonBase
  exports.CommandButton = class CommandButton extends MarkupButtonBase
    constructor: (jencil, args) ->
      [name, cls, @command, @args] = args
      super jencil, name, cls
    click: ->
      @exec @command, @args
    exec: (command, args) ->
      if @editor().richarea.controller?
        @editor().richarea.controller.execCommand command, args
  exports.PromptCommandButton = class PromptCommandButton extends CommandButton
    constructor: (jencil, args) ->
      [name, cls, command, @message, @defaultValue] = args
      super jencil, [name, cls, command, undefined]
    click: ->
      value = prompt @message, @defaultValue or ''
      if value is null then return
      @exec @command, value
