class Wrapper extends Panel
  constructor: (core) ->
    super core
    @element.addClass 'jencil wrapper'
    @workspace = new Workspace(@core)
    @workspace.element.appendTo @element
  
  init: ->
    # if `resizable` of jQuery-UI is available
    if @element.resizable?
      @element.resizable
        resize: => @adjust()
        stop: => @adjust()
    @workspace.init()
    return @

  adjust: ->
    @workspace.element.outerWidth @element.width()
    @workspace.element.outerHeight @element.height()
    @workspace.adjust()
    return @


class Workspace extends Panel
  constructor: (core) ->
    super core
    @element.addClass 'workspace'
    @reconstructor core.profile

  reconstructor: (profile) ->
    # clean-up
    @element.empty()
    # editor panel
    editorClass = profile.getEditorClass()
    @editorPanel = new editorClass(@core)
    # preview panel
    viewerClass = profile.getViewerClass()
    @viewerPanel = new viewerClass(@core)
    @editorPanel.update (value) =>
      @viewerPanel.update value
    @mainPanel = new VerticalPanel(@core, @editorPanel, @viewerPanel, @core.options.defaultSplitterVolume)
    @mainPanel.element.addClass 'mainPanel'
    # toolbar
    @toolbar = new Toolbar(@core)
    buttonClasses = profile.getButtonClasses()
    for buttonClass in buttonClasses
      button = new buttonClass(@core)
      @toolbar.element.append button.element
    @toolbar.element.appendTo @element
    @mainPanel.element.appendTo @element

  init: ->
    @toolbar.init()
    @mainPanel.init()

  adjust: ->
    @toolbar.element.outerWidth @element.width()
    @mainPanel.element.outerWidth @element.width()
    @mainPanel.element.outerHeight @element.height() - @toolbar.element.outerHeight()
    @toolbar.adjust()
    @mainPanel.adjust()
    return @

  toggleViewer: (callback) ->
    volume = @mainPanel.splitter.volume()
    if 0 < volume < 1
      end = 1
      @_previousSplitterVolume = volume
    else
      end = @_previousSplitterVolume or @mainPanel.splitter.defaultVolume
      end = 0.5 if end == 1
    animate
      start: volume
      end: end
      duration: 500
      callback: (value, epoch) =>
        @mainPanel.splitter.volume value
