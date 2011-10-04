###
Jencil editor pane

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- Jencil.widget (jencil.widget.js)
- Jencil.editor (jencil.editor.js)

Dependencies:
- Jencil.utils.detector (jencil.utils.js)
- Jencil.utils.path (jencil.utils.js)
###
namespace 'Jencil.editor.pane', (exports) ->
  Widget = Jencil.widget.Widget
  exports.EditorPane = class EditorPane extends Widget
    constructor: (jencil, cls, @editor) ->
      super jencil, cls
      @_updateCallbacks = []
    init: -> @
    update: (callback) ->
      if callback? then @_updateCallbacks.push callback
      else
        callback() for callback in @_updateCallbacks
    isVisible: ->
      @$element.is ':visible'
    show: ->
      @update()
      @editor.$element.removeClass "#{@cls}-invisible"
      @$element.show()
    hide: -> 
      @editor.$element.addClass "#{@cls}-invisible"
      @$element.hide()
    toggle: ->
      if @isVisible() then @hide() else @show()
    relocate: -> 
      # Do nothing
  exports.PreviewPane = class PreviewPane extends EditorPane
    constructor: (jencil, editor) ->
      super jencil, 'jencil-preview-pane', editor
      @$element.css position: 'relative'
      @$surface = $('<div>').addClass 'surface'
      @$surface.appendTo @$element
      @$surface.css
        width: '100%'
        height: '100%'
        border: ''
        margin: 0
        padding: 0
        overflow: 'auto'
    _writeContent: (content) ->
      process = (template) =>
        @$surface.html template.replace '{{content}}', content
      if not @_previewTemplate?
        templatePath = Jencil.utils.path.abspath @jencil.options.extras.previewTemplatePath
        @$surface.load templatePath, (response, status, xhr) =>
          @_previewTemplate = response
          process response
      else
        process @_previewTemplate
    update: ->
      process = (content) =>
        @_writeContent content
        super()
      process.__super__ = super
      process2 = =>
        content = @editor.getValue()
        if @jencil.profile.extras?.previewParserPath?
          content = encodeURIComponent content
          $.ajax
            url: Jencil.utils.path.abspath @jencil.profile.extras.previewParserPath
            type: @jencil.profile.extras.previewParserMethod or 'GET'
            dataType: @jencil.profile.extras.previewParserType or 'text'
            data: "#{@jencil.profile.extras.previewParserVal or 'data'}=#{content}"
            success: (content) =>
              process content
        else
          process content
      if @jencil.profile? then process2()
      else
        setTimeout =>
          if @jencil.profile? then process2()
          else setTimeout arguments.callee, 100
        , 100
    relocate: ->
      super()
      # quickfix for IE 6 and 7, because they don't know '100%' mean.
      if Jencil.utils.detector.browser is 'Explorer' and Jencil.utils.detector.version < 8
        @$surface.height @$element.height()
