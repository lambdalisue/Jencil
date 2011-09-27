###
Jencil RichEditor

This editor is for editing rich text with preview screeen
###
isIE6 = /MSIE 6/i.test navigator.userAgent
isIE7 = /MSIE 7/i.test navigator.userAgent
class RichArea extends Jencil.widgets.Widget
  constructor: (jencil, @holder) ->
    super jencil, 'jencil-richarea'
    @$source = @jencil.$textarea
    @$surface = new $('<iframe>').addClass 'surface'
    @$surface.attr 'src', @jencil.options.extras.richareaTemplatePath
    @$surface.appendTo @$element
    @$surface.css
      width: '100%'
      height: '100%'
      border: 'none'
      margin: 0
      padding: 0
    # quickfix for IE border issue
    @$surface.attr 'frameborder', '0'
  init: ->
    @controller = new Richarea @$surface
    # Add construct code which will be called after richarea get ready
    @controller.ready =>
      $(@controller.raw.body).css
        margin: 0
        padding: 0
      # quickfix for IE focus issue
      @$surface.bind 'click', =>
        alert "Clicked"
        @controller.raw.body.focus()
      @controller.setValue @$source.val()
      $(@controller.raw.body).bind 'keypress change click blur enter', =>
        @update()
      @update()
  getValue: ->
    if @controller?.isReady() then return @controller.getValue()
  setValue: (value) ->
    if @controller?.isReady() then @controller.setValue value
  update: ->
    @$source.val @controller?.getValue()
class Rawview extends Jencil.widgets.Widget
  constructor: (jencil, @holder) ->
    super jencil, 'jencil-rawview'
    @$surface = new $('<textarea>').addClass 'surface'
    @$surface.appendTo @$element
    @$surface.css
      width: '100%'
      height: '100%'
      border: 'none'
      margin: 0
      padding: 0
      resize: 'none'
      outline: 'none'
    @show()
  init: ->
    @holder.richarea.controller.ready =>
      @$surface.bind 'keyup change click blur enter', =>
        @reverseUpdate()
      $(@holder.richarea.controller.raw.body).bind 'keypress change click blur enter', =>
        @forwardUpdate()
      @forwardUpdate()
  isVisible: ->
    return @$element.is ':visible'
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
    if @isVisible()
      @hide()
    else
      @show()
  forwardUpdate: ->
    # Rich -> Raw
    @$surface.val @holder.richarea.getValue()
  reverseUpdate: ->
    # Raw -> Rich
    @holder.richarea.setValue @$surface.val()
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
      @$element.addClass "#{@jencil.options.extras.rawviewPosition}"
      @richarea = new RichArea @jencil, @
      @rawview = new Rawview @jencil, @
      if @jencil.options.extras.rawviewPosition in ['top', 'left']
        @append @rawview
        @append @richarea
      else
        @append @richarea
        @append @rawview
      if @jencil.options.extras.defaultRawviewState is 'close'
        @rawview.hide()
    reconstruct: ->
      getOffsetX = ($$) ->
        return $$.outerWidth(true) - $$.width()
      getOffsetY = ($$) ->
        return $$.outerHeight(true) - $$.height()
      # get each element offset
      offsettx = getOffsetX @richarea.$element
      offsetpx = getOffsetX @rawview.$element
      offsetty = getOffsetY @richarea.$element
      offsetpy = getOffsetY @rawview.$element
      # get size
      width = @$element.width()
      height = @$element.height()
      if @rawview.isVisible()
        if @jencil.options.extras.rawviewPosition in ['left', 'right']
            if @jencil.options.extras.rawviewPosition is 'left'
              @richarea.$element.css float: 'right'
              @rawview.$element.css float: 'left'
            else if @jencil.options.extras.rawviewPosition is 'right'
              @richarea.$element.css float: 'left'
              @rawview.$element.css float: 'right'
            # set width
            @richarea.$element.width width/2-offsettx
            @rawview.$element.width width/2-offsetpx
            # set height
            @richarea.$element.height height-offsetty
            @rawview.$element.height height-offsetpy
        else
          # set width
          @richarea.$element.width width-offsettx
          @rawview.$element.width width-offsetpx
          # set height
          @richarea.$element.height height/2-offsetty
          @rawview.$element.height height/2-offsetpy
      else
        @richarea.$element.css float: 'none'
        @rawview.$element.css float: 'none'
        # set width
        @richarea.$element.width width-offsettx
        # set height
        @richarea.$element.height height-offsetty
      # quickfix for IE 6, 7
      if isIE6 or isIE7
        @richarea.$surface.height @richarea.$element.height()
        @rawview.$surface.height @rawview.$element.height()
    init: ->
      @reconstruct()
      @richarea.init()
      @rawview.init()
    update: ->
      @richarea.update()
      @rawview.forwardUpdate()
    getValue: ->
      return @richarea.getValue()
# --- Add extra buttons for TextEditor
namespace 'Jencil.buttons', (exports) ->
  ButtonBase = Jencil.buttons.ButtonBase
  MarkupButtonBase = Jencil.buttons.MarkupButtonBase
  exports.RawviewButton = class RawviewButton extends ButtonBase
    constructor: (jencil, args) ->
      super jencil, 'rawview', 'Rawview'
    click: ->
      editor = @editor()
      editor.rawview.toggle()
      editor.reconstruct()
  exports.CommandButton = class CommandButton extends MarkupButtonBase
    constructor: (jencil, args) ->
      [name, cls, @command, @value] = args
      super jencil, name, cls
    click: ->
      @exec @command, @value
    exec: (command, value) ->
      if @editor().richarea.controller
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
