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
      @show()
    show: ->
      @update()
      @wysiwym.$element.attr 'preview', 'preview'
      @wysiwym.textarea.$element.bind 'keyup change click blur enter', =>
        @update()
      @$element.show 'fast'
    hide: ->
      @wysiwym.$element.attr 'preview', ''
      @wysiwym.textarea.$element.unbind 'keyup change click blur enter', =>
        @update()
      @$element.hide 'fast'
    toggle: ->
      if @$element.is ':visible'
        @hide()
      else
        @show()
    update: ->
      content = @wysiwym.getValue()
      # Parse value
      profileName = @jencil.documentType.getProfileName()
      parserSet = @jencil.options.previewParserSets.markdown
      if parserSet?
        url = parserSet[0]
        val = parserSet[1]
        method = parserSet[2]
        $.ajax(
          type: method
          dataType: 'text'
          url: url
          data: "#{val}=#{encodeURIComponent content}"
          success: (data) =>
            @write data
        )
      else
        @write content
    write: (content) ->
      @$surface.load @jencil.options.previewTemplatePath, (response, status, xhr) ->
        $(this).html $(this).html().replace '{{content}}', content
  # What You See Is What You Mean (Markup text)
  exports.Wysiwym = class Wysiwym extends Editor
    constructor: (jencil) ->
      super jencil, 'jencil-wysiwym-editor', 'div'
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




