namespace 'Jencil.widgets', (exports) ->
  Widget = Jencil.widgets.Widget
  Editor = Jencil.widgets.Editor
  class TextArea extends Widget
    constructor: (jencil, @holder) ->
      super jencil, 'jencil-textarea'
      @jencil.$textarea.addClass 'surface'
      @controller = new Textarea @jencil.$textarea
  class Preview extends Widget
    constructor: (jencil, @holder) ->
      super jencil, 'jencil-preview', 'div'
      @$surface = $('<div>').addClass 'surface'
      @$element.append @$surface
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
      @$surface.load @jencil.options.previewTemplatePath, (response, status, xhr) ->
        $(this).html $(this).html().replace '{{content}}', content
  # What You See Is What You Mean (Markup text)
  exports.TextEditor = class TextEditor extends Editor
    constructor: (jencil) ->
      super jencil, 'jencil-text-editor', 'div'
      @$element.addClass "preview-position-#{@jencil.options.previewPosition}"
      @textarea = new TextArea @jencil, @
      @preview = new Preview @jencil, @
    update: ->
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
