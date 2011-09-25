###
Jencil TextEditor

This editor is for editing simple text with preview feature
###
namespace 'Jencil.editors', (exports) ->
  Widget = Jencil.widgets.Widget
  Editor = Jencil.editors.Editor
  class TextArea extends Widget
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
  class Preview extends Widget
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
        if Jencil.profile.previewParserPath?
          $.ajax(
            type: Jencil.profile.previewParserMethod ? 'GET'
            dataType: 'text'
            global: false
            url: @jencil.abspath Jencil.profile.previewParserPath
            data: "#{Jencil.profile.previewParserVal ? 'data'}=#{encodeURIComponent content}"
            success: (data) =>
              @write data
          )
        else
          @write content
      if Jencil.profile?
        _update()
      else
        setTimeout =>
          if Jencil.profile?
            _update()
          else
            setTimeout arguments.callee, 100
        , 100
    write: (content) ->
      url = @jencil.options.previewTemplatePath
      @$surface.load url, (response, status, xhr) ->
        $$ = $(this)
        $$.html $$.html().replace '{{content}}', content
  # What You See Is What You Mean (Markup text)
  exports.TextEditor = class TextEditor extends Editor
    constructor: (jencil) ->
      super jencil, 'jencil-text-editor', 'div'
      @$element.addClass "preview-position-#{@jencil.options.previewPosition}"
      @textarea = new TextArea @jencil, @
      @preview = new Preview @jencil, @
      @append @textarea
      @append @preview
      if $.fn.tabby?
        # Enable TAB and SHIFT+TAB feature with jQuery tabby plugin
        # http://teddevito.com/demos/textarea.html
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
