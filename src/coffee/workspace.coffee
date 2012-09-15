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
        start: =>
          @core.editor()?.curtain?.on()
          @core.viewer()?.curtain?.on()
          @core.helper()?.curtain?.on()
        resize: =>
          @core.editor()?.curtain?.refresh()
          @core.viewer()?.curtain?.refresh()
          @core.helper()?.curtain?.refresh()
          @adjust()
        stop: =>
          @core.editor()?.curtain?.off()
          @core.viewer()?.curtain?.off()
          @core.helper()?.curtain?.off()
          @adjust()
    @workspace.init()
    return @adjust()

  adjust: ->
    @workspace.element.outerWidth true, @element.width()
    @workspace.element.outerHeight true, @element.height()
    @workspace.adjust()
    return @

class Workspace extends Panel
  constructor: (core) ->
    super core
    @element.addClass 'workspace'
    @profile(new core.options.profile)

  profile: (profile) ->
    if profile?
      @element.empty()
      @mainPanel = new profile.mainPanelClass(@core, profile)
      # toolbar
      @toolbar = new Toolbar(@core)
      for button in profile.toolbarButtons
        button = buttonFactory(@core, button)
        @toolbar.addButton button
      # statusbar
      @statusbar = new Statusbar(@core)
      for button in profile.statusbarButtons
        button = buttonFactory(@core, button)
        @statusbar.addButton button
      @element.append @toolbar.element
      @element.append @mainPanel.element
      @element.append @statusbar.element
      @_profile = profile
      return @
    return @_profile

  init: ->
    @toolbar.init()
    @statusbar.init()
    @mainPanel.init()
    @adjust()

  adjust: ->
    @toolbar.element.outerWidth true, @element.width()
    @statusbar.element.outerWidth true, @element.width()
    @mainPanel.element.outerWidth true, @element.width()
    @toolbar.adjust()
    @statusbar.adjust()
    offset = @toolbar.element.outerHeight(true) + @statusbar.element.outerHeight(true)
    @mainPanel.element.outerHeight true, @element.height() - offset
    @mainPanel.adjust()
    return @

  update: ->
    if @mainPanel.editorPanel and @mainPanel.viewerPanel
      @mainPanel.viewerPanel.update @mainPanel.editorPanel.val()


class Bar extends Panel
  constructor: (core) ->
    super core
    @_buttons = []

  init: ->
    button.init() for button in @_buttons
    return @

  addButton: (button) ->
    @_buttons.push button
    @element.append button.element

class Toolbar extends Bar
  constructor: (core) ->
    super core
    @element.addClass 'toolbar'

class Statusbar extends Bar
  constructor: (core) ->
    super core
    @element.addClass 'statusbar'

