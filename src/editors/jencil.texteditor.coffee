###
Jencil TextEditor

This editor is for editing simple text with preview screeen
###
class TextArea extends Jencil.widgets.Widget
  constructor: (jencil, @holder) ->
    super jencil, 'jencil-textarea'
    @$source = @jencil.$textarea
    @$surface = new $('<textarea>').addClass 'surface'
    @$surface.val @$source.val()
    @$surface.bind 'keyup change click blur enter', =>
      @update()
    @$surface.appendTo @$element
    @controller = new Textarea @$surface
  update: ->
    @$source.val @$surface.val()
class Preview extends Jencil.widgets.Widget
  constructor: (jencil, @holder) ->
    super jencil, 'jencil-preview'
    @$surface = new $('<div>').addClass 'surface'
    @$surface.appendTo @$element
    @holder.textarea.$element.bind 'keyup change click blur enter', =>
      @update()
    @show()
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
    if @$element.is ':visible'
      @hide()
    else
      @show()
  update: ->
    _update = =>
      content = @holder.getValue()
      if @jencil.profile.extras?.previewParserPath?
        $.ajax(
          type: @jencil.profile.extras.previewParserMethod ? 'GET'
          dataType: 'text'
          global: false
          url: @jencil.profile.extras.previewParserPath
          data: "#{@jencil.profile.extras.previewParserVal ? 'data'}=#{encodeURIComponent content}"
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
      ['http://teddevito.com/demos/js/jquery.textarea.js', '$.fn.tabby']
    ]
    options: 
      previewPosition: 'right'
      previewTemplatePath: '~/templates/preview.html'
    constructor: (jencil) ->
      super jencil
      @options.previewTemplatePath = jencil.abspath @options.previewTemplatePath
namespace 'Jencil.editors', (exports) ->
  EditorBase = Jencil.editors.EditorBase
  exports.TextEditor = class TextEditor extends EditorBase
    @Initializer: Initializer
    constructor: (jencil) ->
      super jencil, 'jencil-text-editor', 'div'
      @$element.addClass "preview-position-#{@jencil.options.extras.previewPosition}"
      @textarea = new TextArea @jencil, @
      @preview = new Preview @jencil, @
      @append @textarea
      @append @preview
      if $.fn.tabby?
        # Enable TAB and SHIFT+TAB feature with jQuery tabby plugin
        @$element.tabby()
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
      @editor().preview?.toggle()
