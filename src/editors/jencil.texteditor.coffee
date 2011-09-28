###
Jencil TextEditor

This editor is for editing simple text with preview screeen
###
isIE6 = /MSIE 6/i.test navigator.userAgent
isIE7 = /MSIE 7/i.test navigator.userAgent
isIE8 = /MSIE 8/i.test navigator.userAgent
class TextArea extends Jencil.widgets.Widget
  constructor: (jencil, @holder) ->
    super jencil, 'jencil-textarea'
    @$element.css
      position: 'relative'
    @$source = @jencil.$textarea
    @$surface = $('<textarea>').addClass 'surface'
    @$surface.val @$source.val()
    @$surface.css
      width: '100%'
      height: '100%'
      border: 'none'
      margin: 0
      padding: 0
      resize: 'none'
      outline: 'none'
    @$surface.bind 'keypress change click blur enter', =>
      @update()
    @$surface.appendTo @$element
    @controller = new Textarea @$surface
  update: ->
    @$source.val @$surface.val()
class Preview extends Jencil.widgets.Widget
  constructor: (jencil, @holder) ->
    super jencil, 'jencil-preview'
    @$element.css
      position: 'relative'
    @$surface = $('<div>').addClass 'surface'
    @$surface.appendTo @$element
    @$surface.css
      width: '100%'
      height: '100%'
      border: ''
      margin: 0
      padding: 0
      overflow: 'auto'
    @holder.textarea.$element.bind 'keypress change click blur enter', =>
      @update()
    @show()
  isVisible: ->
    return @$element.is ':visible'
  show: ->
    @update()
    # Quickfix to set attr twice with different instance
    @$element.parent().addClass 'preview-enable'
    @holder.$element.addClass 'preview-enable'
    @$element.show()
  hide: ->
    @$element.hide()
    # Quickfix to set attr twice with different instance
    @$element.parent().removeClass 'preview-enable'
    @holder.$element.removeClass 'preview-enable'
  toggle: ->
    if @isVisible()
      @hide()
    else
      @show()
  update: ->
    _update = =>
      content = @holder.getValue()
      if @jencil.profile.extras?.previewParserPath?
        $.ajax(
          type: @jencil.profile.extras.previewParserMethod or 'GET'
          dataType: 'text'
          global: false
          url: @jencil.profile.extras.previewParserPath
          data: "#{@jencil.profile.extras.previewParserVal or 'data'}=#{encodeURIComponent content}"
          success: (data) =>
            @write data
        )
      else
        @write content
    if @jencil.profile?
      _update()
    else
      setTimeout =>
        if @jencil.profile?
          _update()
        else
          setTimeout arguments.callee, 100
      , 100
  write: (content) ->
    url = @jencil.options.extras.previewTemplatePath
    @$surface.load url, (response, status, xhr) ->
      $$ = $(this)
      $$.html $$.html().replace '{{content}}', content
class Initializer extends Jencil.editors.Initializer
    stylesheets: [
      ['~/jencil.texteditor.css', 'screen, projection']
    ]
    requires: [
      ['~/textarea.min.js', 'window.Textarea']
      ['~/jquery.textarea.min.js', '$.fn.tabby']
    ]
    options: 
      previewPosition: 'right'
      previewTemplatePath: '~/templates/preview.html'
      defaultPreviewState: 'open'
    constructor: (jencil) ->
      super jencil
      @options.previewTemplatePath = jencil.abspath @options.previewTemplatePath
namespace 'Jencil.editors', (exports) ->
  EditorBase = Jencil.editors.EditorBase
  exports.TextEditor = class TextEditor extends EditorBase
    @Initializer: Initializer
    constructor: (jencil) ->
      super jencil, 'jencil-text-editor', 'div'
      @$element.addClass "#{@jencil.options.extras.previewPosition}"
      @textarea = new TextArea @jencil, @
      @preview = new Preview @jencil, @
      if @jencil.options.extras.previewPosition in ['top', 'left']
        @append @preview
        @append @textarea
      else
        @append @textarea
        @append @preview
      if $.fn.tabby?
        # Enable TAB and SHIFT+TAB feature with jQuery tabby plugin
        @$element.tabby()
      if @jencil.options.extras.defaultPreviewState is 'close'
        @preview.hide()
    reconstruct: ->
      getOffsetX = ($$) ->
        return $$.outerWidth(true) - $$.width()
      getOffsetY = ($$) ->
        return $$.outerHeight(true) - $$.height()
      # get each element offset
      offsettx = getOffsetX @textarea.$element
      offsetpx = getOffsetX @preview.$element
      offsetty = getOffsetY @textarea.$element
      offsetpy = getOffsetY @preview.$element
      # get size
      width = @$element.width()
      height = @$element.height()
      if @preview.isVisible()
        if @jencil.options.extras.previewPosition in ['left', 'right']
            if @jencil.options.extras.previewPosition is 'left'
              @textarea.$element.css float: 'right'
              @preview.$element.css float: 'left'
            else if @jencil.options.extras.previewPosition is 'right'
              @textarea.$element.css float: 'left'
              @preview.$element.css float: 'right'
            # set width
            @textarea.$element.width width/2-offsettx
            @preview.$element.width width/2-offsetpx
            # set height
            @textarea.$element.height height-offsetty
            @preview.$element.height height-offsetpy
        else
          # set width
          @textarea.$element.width width-offsettx
          @preview.$element.width width-offsetpx
          # set height
          @textarea.$element.height height/2-offsetty
          @preview.$element.height height/2-offsetpy
      else
        @textarea.$element.css float: 'none'
        @preview.$element.css float: 'none'
        # set width
        @textarea.$element.width width-offsettx
        # set height
        @textarea.$element.height height-offsetty
      # quickfix for IE 6, 7
      if isIE6 or isIE7
        @textarea.$surface.height @textarea.$element.height()
        @preview.$surface.height @preview.$element.height()
      # quickfix for IE 8. Without this code, only IE 8 hung up after switched
      # from different editor.
      if isIE8
        range = document.selection.createRange()
        range.select()
    init: ->
      @reconstruct()
      @update()
    update: ->
      @textarea.update()
      @preview.update()
    getValue: ->
      return @textarea.controller.getValue()
    getSelection: ->
      return @textarea.controller.getSelection()
    setSelection: (start, end) ->
      @textarea.controller.setSelection start, end
    getSelected: ->
      return @textarea.controller.getSelected()
    replaceSelected: (str, select=false) ->
      @textarea.controller.replaceSelected str, select
    insertBeforeSelected: (str, select=false) ->
      @textarea.controller.insertBeforeSelected str, select
    insertAfterSelected: (str, select=false) ->
      @textarea.controller.insertAfterSelected str, select
    wrapSelected: (before, after, select=false, additional=undefined) ->
      @textarea.controller.wrapSelected before, after, select, additional
# --- Add extra buttons for TextEditor
namespace 'Jencil.buttons', (exports) ->
  ButtonBase = Jencil.buttons.ButtonBase
  exports.PreviewButton = class PreviewButton extends ButtonBase
    constructor: (jencil, args) ->
      super jencil, 'preview', 'Preview'
    click: ->
      editor = @editor()
      editor.preview.toggle()
      editor.reconstruct()
