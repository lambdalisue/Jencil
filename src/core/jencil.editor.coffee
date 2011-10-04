###
Jencil editor

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- Jencil.widget (jencil.widget.js)

Dependencies
- Jencil.utils.script (jencil.utils.js)
- Jencil.theme (jencil.theme.js)
###
namespace 'Jencil.editor', (exports) ->
  Widget = Jencil.widget.Widget
  getOffsetX = ($$) -> $$.outerWidth(true) - $$.width()
  getOffsetY = ($$) -> $$.outerHeight(true) - $$.height()
  exports.use = use = (jencil, name, callback=undefined) ->
    prepare = ->
      extras = Jencil.editor[name].extras
      if extras?.options?
        jencil.options.extras = $.extend true, extras.options, jencil.options.extras ? {}
      if extras?.stylesheets?
        Jencil.theme.includeall extras.stylesheets
      if extras?.requires?
        Jencil.utils.script.loadall extras.requires, ->
          process()
      else
        process()
    process = ->
      editorClass = Jencil.editor[name]
      # remove previous editor
      if jencil.workspace.editor?
        jencil.workspace.editor.$element.remove()
        jencil.workspace.editor = null
      # add new editor
      editor = new editorClass jencil
      jencil.workspace.append editor
      jencil.workspace.editor = editor
      editor.init()
      callback() if callback?
    if name instanceof Array
      [name, url, check] = name
      # load external editor script
      Jencil.utils.script.load url, check, ->
        prepare()
    else
      prepare()
  exports.EditorBase = class EditorBase extends Widget
    constructor: (jencil, cls) ->
      super jencil, cls
      @workspace = @jencil.workspace
      @$element.addClass 'jencil-editor'
      @$element.hide()
    init: -> 
      @$element.show()
      @relocate()
    update: -> 
      @relocate()
    relocate: ->
      # get offsets
      offsetX = getOffsetX @$element
      offsetY = getOffsetY @$element
      # store size
      width = @workspace.$element.width()
      height = @workspace.$element.height()
      @$element.width width - offsetX
      @$element.height height - offsetY
  exports.SinglePaneEditorBase = class SinglePaneEditorBase extends EditorBase
    constructor: (jencil, cls, @pane) ->
      super jencil, cls
      @pane.$element.appendTo @$element
      @pane.$element.addClass 'jencil-pane'
      @$element.addClass "jencil-siglepane-editor"
    init: ->
      @pane.init()
      super()
    update: ->
      @pane.update()
      super()
    relocate: ->
      super()
      # get each pane offsets
      offsetX = getOffsetX @pane.$element
      offsetY = getOffsetY @pane.$element
      # store size
      width = @$element.width()
      height = @$element.height()
      @pane.$element.width width-offsetX
      @pane.$element.height height-offsetY
  exports.DualPaneEditorBase = class DualPaneEditorBase extends EditorBase
    constructor: (jencil, cls, @lhspane, @rhspane, @panedir='horizontal') ->
      super jencil, cls
      @lhspane.$element.appendTo @$element
      @rhspane.$element.appendTo @$element
      @lhspane.$element.addClass 'jencil-lhspane'
      @rhspane.$element.addClass 'jencil-rhspane'
      @$element.addClass "jencil-panedir-#{@panedir}"
    init: ->
      @lhspane.init()
      @rhspane.init()
      super()
    update: ->
      @lhspane.update()
      @rhspane.update()
      super()
    relocate: ->
      super()
      # apply class before calculate
      if @lhspane.isVisible() and @rhspane.isVisible()
        @$element.removeClass 'jencil-singlepane-editor'
        @$element.addClass "jencil-dualpane-editor"
      else
        @$element.addClass 'jencil-singlepane-editor'
        @$element.removeClass "jencil-dualpane-editor"

      # get each pane offsets
      lhsOffsetX = getOffsetX @lhspane.$element
      rhsOffsetX = getOffsetX @rhspane.$element
      lhsOffsetY = getOffsetY @lhspane.$element
      rhsOffsetY = getOffsetY @rhspane.$element
      # store size
      width = @$element.width()
      height = @$element.height()
      if @lhspane.isVisible() and @rhspane.isVisible()
        if @panedir is 'horizontal'
          @lhspane.$element.css 'float': 'left'
          @rhspane.$element.css 'float': 'right'
          @lhspane.$element.width width/2-lhsOffsetX
          @rhspane.$element.width width/2-rhsOffsetX
          @lhspane.$element.height height-lhsOffsetY
          @rhspane.$element.height height-rhsOffsetY
        else
          @lhspane.$element.css 'float': 'none'
          @rhspane.$element.css 'float': 'none'
          @lhspane.$element.width width-lhsOffsetX
          @rhspane.$element.width width-rhsOffsetX
          @lhspane.$element.height height/2-lhsOffsetY
          @rhspane.$element.height height/2-rhsOffsetY
      else if @lhspane.isVisible()
        @lhspane.$element.css 'float': 'none'
        @lhspane.$element.width width-lhsOffsetX
        @lhspane.$element.height height-lhsOffsetY
      else
        @rhspane.$element.css 'float': 'none'
        @rhspane.$element.width width-rhsOffsetX
        @rhspane.$element.height height-rhsOffsetY
      @lhspane.relocate()
      @rhspane.relocate()
