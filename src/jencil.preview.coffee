namespace 'Jencil.widgets', (exports) ->
  Widget = Jencil.widgets.Widget
  exports.Preview = class Preview extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil-preview', 'div'
      @$surface = $('<div>').addClass 'jencil-preview-surface'
      @$element.append @$surface
      @enable()
    enable: ->
      @update()
      @jencil.@editorArea.$element.addClass 'with-preview'
      @jencil.$textarea.bind 'keyup change click blur enter', =>
        @update()
      @$element.show 'fast'
    disable: ->
      @jencil.@editorArea.$element.removeClass 'with-preview'
      @jencil.$textarea.unbind 'keyup change click blur enter', =>
        @update()
      @$element.hide 'fast'
    toggle: ->
      if @$element.is ':visible'
        @disable()
      else
        @enable()
    update: ->
      content = @jencil.getValue()
      @$surface.load @jencil.options.previewTemplateUrl, (response, status, xhr) ->
        $(this).html $(this).html().replace '{{content}}', content
