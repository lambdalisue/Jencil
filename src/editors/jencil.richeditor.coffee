###
Jencil RichEditor

This editor is for editing rich text with preview screeen
###
class RichArea extends Jencil.widgets.Widget
  constructor: (jencil, @holder) ->
    super jencil, 'jencil-richarea'
    @$source = @jencil.$textarea
    @$surface = new $('<iframe>').addClass 'surface'
    @$surface.appendTo @$element
  init: ->
    # Created iframe doesn't have <body> so we need to create it
    @controller = new Richarea @$surface
    # Load template head
    console.log @jencil.options.extras.richareaTemplatePath
    $.get @jencil.options.extras.richareaTemplatePath, null, (html) =>
      container = document.createElement 'div'
      container.innerHTML = html
      console.log container
      @controller.raw.document.head.innerHTML = container.innerHTML
    , 'html'

    @controller.setValue @$source.val()
    $(@controller.raw.body).bind 'keyup change click blur enter', =>
      @update()
    @update()
  update: ->
    @$source.val @controller?.getValue()
class Rawview extends Jencil.widgets.Widget
  constructor: (jencil, @holder) ->
    super jencil, 'jencil-rawview'
    @$surface = new $('<textarea>').addClass 'surface'
    @$surface.appendTo @$element
    @show()
  init: ->
    @$surface.bind 'keyup change click blur enter', =>
      @reverseUpdate()
    $(@holder.richarea.controller.raw.body).bind 'keyup change click blur enter', =>
      @forwardUpdate()
    @forwardUpdate()
  show: ->
    @forwardUpdate()
    # Quickfix to set attr twice with different instance
    @$element.parent().addClass 'rawview-enable'
    @holder.$element.addClass 'rawview-enable'
    @$element.show()
  hide: ->
    @$element.hide()
    # Quickfix to set attr twice with different instance
    @$element.parent().removeClass 'rawview-enable'
    @holder.$element.removeClass 'rawview-enable'
  toggle: ->
    if @$element.is ':visible'
      @hide()
    else
      @show()
  forwardUpdate: ->
    # Rich -> Raw
    @$surface.val @holder.getValue()
  reverseUpdate: ->
    # Raw -> Rich
    @holder.richarea.controller?.setValue @$surface.val()
class Initializer extends Jencil.editors.Initializer
    stylesheets: [
      ['~/jencil.richeditor.css', 'screen, projection']
    ]
    requires: [
      ['~/richarea.min.js', 'window.Richarea']
    ]
    options: 
      rawviewPosition: 'right'
      richareaTemplatePath: '~/templates/richarea.html'
      defaultRawviewState: 'close'
    constructor: (jencil) ->
      super jencil
      @options.richareaTemplatePath = jencil.abspath @options.richareaTemplatePath
namespace 'Jencil.editors', (exports) ->
  EditorBase = Jencil.editors.EditorBase
  exports.RichEditor = class RichEditor extends EditorBase
    @Initializer: Initializer
    constructor: (jencil) ->
      super jencil, 'jencil-rich-editor', 'div'
      @$element.addClass "rawview-position-#{@jencil.options.extras.rawviewPosition}"
      @richarea = new RichArea @jencil, @
      @rawview = new Rawview @jencil, @
      @append @richarea
      @append @rawview
      if @jencil.options.extras.defaultRawviewState is 'close'
        @rawview.hide()
    init: ->
      @richarea.init()
      @rawview.init()
    update: ->
      @richarea.update()
      @rawview.forwardUpdate()
    getValue: ->
      return @richarea.controller?.getValue()
# --- Add extra buttons for TextEditor
namespace 'Jencil.buttons', (exports) ->
  ButtonBase = Jencil.buttons.ButtonBase
  MarkupButtonBase = Jencil.buttons.MarkupButtonBase
  exports.RawviewButton = class RawviewButton extends ButtonBase
    constructor: (jencil, args) ->
      super jencil, 'rawview', 'Rawview'
    click: ->
      @editor().rawview?.toggle()
  exports.CommandButton = class CommandButton extends MarkupButtonBase
    constructor: (jencil, args) ->
      [name, cls, @command, @value] = args
      super jencil, name, cls
    click: ->
      @exec @command, @value
    exec: (command, value) ->
      if @editor().richarea?.controller?
        if not @editor().richarea.controller[command]?
          if window.console?.error? then console.error "#{command} is not defined on Richarea"
        else
          @editor().richarea.controller[command] value
  exports.PromptCommandButton = class PromptCommandButton extends CommandButton
    constructor: (jencil, args) ->
      [name, cls, command, @message, @defaultValue] = args
      super jencil, [name, cls, command, undefined]
    click: ->
      value = prompt @message, @defaultValue or ''
      if value is null then return
      @exec @command, value
