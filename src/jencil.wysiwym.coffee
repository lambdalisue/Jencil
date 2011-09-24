namespace 'Jencil.widgets', (exports) ->
  Widget = Jencil.widgets.Widget
  Editor = Jencil.widgets.Editor
  class TextArea extends Widget
    constructor: (jencil, @wysiwym) ->
      super jencil, 'jencil-wysiwym-textarea', jencil.$textarea
      @controller = new Textarea @$element
  class Preview extends Widget
    constructor: (jencil, @wysiwym) ->
      super jencil, 'jencil-wysiwym-preview', 'div'
      @$surface = $('<div>').addClass 'surface'
      @$element.append @$surface
      @wysiwym.textarea.$element.bind 'keyup change click blur enter', =>
        @update()
      @show()
    show: ->
      @update()
      # Quickfix to set attr twice with different instance
      @$element.parent().attr 'preview', 'preview'
      @wysiwym.$element.attr 'preview', 'preview'
      @$element.show()
    hide: ->
      @$element.hide()
      # Quickfix to set attr twice with different instance
      @$element.parent().removeAttr 'preview'
      @wysiwym.$element.attr 'preview', 'preview'
    toggle: ->
      if @$element.is ':visible'
        @hide()
      else
        @show()
    update: ->
      _update = =>
        content = @wysiwym.getValue()
        if Jencil.profile.previewPraserPath?
          $.ajax(
            type: Jencil.profile.previewParserMethod ? 'GET'
            dataType: 'text'
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
        setTimeout ->
          if Jencil.profile?
            _update()
          else
            setTimeout arguments.callee, 100
        , 100
    write: (content) ->
      @$surface.load @jencil.options.previewTemplatePath, (response, status, xhr) ->
        $(this).html $(this).html().replace '{{content}}', content
  # What You See Is What You Mean (Markup text)
  exports.Wysiwym = class Wysiwym extends Editor
    constructor: (jencil) ->
      super jencil, 'jencil-wysiwym-editor', 'div'
      @$element.attr 'preview-position', @jencil.options.previewPosition
      @textarea = new TextArea @jencil, @
      @preview = new Preview @jencil, @
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
