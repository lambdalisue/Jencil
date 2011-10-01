###
Jencil RichEditor

This editor is for editing rich text with preview screeen
###
isIE6 = /MSIE 6/i.test navigator.userAgent
isIE7 = /MSIE 7/i.test navigator.userAgent
isIE8 = /MSIE 8/i.test navigator.userAgent
class RichArea extends Jencil.widgets.Widget
  constructor: (jencil, @holder) ->
    super jencil, 'jencil-richarea'
    @$source = @jencil.$textarea
    @$surface = $('<iframe>').addClass 'surface'
    if @jencil.options.extras.richareaTemplatePath?
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
      @holder.reconstruct()
      $(@controller.raw.body).css
        margin: 0
        padding: 0
      @controller.setValue @$source.val()
      $(@controller.raw.body).bind 'keypress change click blur enter', =>
        @update()
      @update()
  getValue: ->
    if @controller?.ready() then return @controller.getValue()
  setValue: (value) ->
    if @controller?.ready() then @controller.setValue value
  update: ->
    @$source.val @controller?.getValue()
class Rawview extends Jencil.widgets.Widget
  constructor: (jencil, @holder) ->
    super jencil, 'jencil-rawview'
    @$surface = $('<textarea>').addClass 'surface'
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
      super jencil, 'jencil-rich-editor'
      @$element.addClass "#{@jencil.options.extras.rawviewPosition}"
      @richarea = new RichArea @jencil, @
      @rawview = new Rawview @jencil, @
      if @jencil.options.extras.rawviewPosition in ['top', 'left']
        @append @rawview
        @append @richarea
      else
        @append @richarea
        @append @rawview
      # loading iframe takes a minute so use 'jencil-loader' for nice visual
      @$element.addClass 'jencil-loader'
      @richarea.$element.hide()
      @rawview.hide()
    reconstruct: ->
      if @$element.hasClass 'jencil-loader'
        @$element.removeClass 'jencil-loader'
        @richarea.$element.show()
        if @jencil.options.extras.defaultRawviewState isnt 'close'
          @rawview.show()
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

        # IE body size issue fix
        if isIE6 or isIE7 or isIE8
          @richarea.controller.raw.body.style.height = "#{@richarea.$surface.height()}px"
        # IE body size issue fix
        if isIE6 or isIE7 or isIE8
          @richarea.controller.raw.body.style.height = "#{@richarea.$surface.height()}px"

        # IE body size issue fix
        if isIE6 or isIE7 or isIE8
          @richarea.controller.raw.body.style.height = "#{@richarea.$surface.height()}px"
      # quickfix IE body height issue
      if isIE6 or isIE7 or isIE8
        $(@richarea.controller.raw.body).height @richarea.$surface.height()
    init: ->
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
