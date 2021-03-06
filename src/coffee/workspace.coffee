class Wrapper extends Panel
  constructor: (core, width, height) ->
    super core
    @element.addClass 'jencil wrapper'
    @element.width width
    @element.height height
    @workspace = new Workspace(@core)
    @workspace.element.appendTo @element
    # Add curtain fake object
    @curtain =
      on: =>
        @core.editor()?.curtain?.on()
        @core.viewer()?.curtain?.on()
        @core.helper()?.curtain?.on()
        @adjust()
      refresh: =>
        @core.editor()?.curtain?.refresh()
        @core.viewer()?.curtain?.refresh()
        @core.helper()?.curtain?.refresh()
        @adjust()
      off: =>
        @core.editor()?.curtain?.off()
        @core.viewer()?.curtain?.off()
        @core.helper()?.curtain?.off()
        @adjust()

  init: (profileNameOrInstance) ->
    # if `resizable` of jQuery-UI is available
    if @element.resizable? and @core.options.resizable is true
      @element.resizable
        start: => @curtain.on()
        resize: => @curtain.refresh()
        stop: => @curtain.off()
    @workspace.profile(profileNameOrInstance)
    @workspace.init()
    return @

  adjust: ->
    @workspace.element.outerWidth true, @element.width()
    @workspace.element.outerHeight true, @element.height()
    @workspace.adjust()
    return @

class Workspace extends Panel
  constructor: (core) ->
    super core
    @element.addClass 'workspace'

  profile: (profileNameOrInstance) ->
    if profileNameOrInstance?
      if typeof profileNameOrInstance is 'string'
        profileNameOrInstance = @core.options.profiles[profileNameOrInstance]
      # extend
      profile = jQuery.extend(true, DefaultProfile, profileNameOrInstance)
      profile.defaultVolume = @core.options.defaultVolume or profile.defaultVolume
      profile.defaultVolume2 = @core.options.defaultVolume2 or profile.defaultVolume2
      @element.empty()
      @mainPanel = new profile.mainPanelClass(@core, profile)
      # update editor panel
      @mainPanel.editorPanel?.val @core.element.val()
      # connect mainPanel.editorPanel and actual element
      @mainPanel.editorPanel?.change (value) => @core.element.val value
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

  adjust: ->
    @toolbar.element.outerWidth true, @element.width()
    @statusbar.element.outerWidth true, @element.width()
    @mainPanel.element.outerWidth true, @element.width()
    # Hack: refresh DOM to reset outerHeight of toolbar/statusbar correctly
    @mainPanel.element.outerHeight true, @element.height()
    @mainPanel.adjust()
    # --- /refresh
    offset1 = @toolbar.element.outerHeight(true)
    offset2 = @statusbar.element.outerHeight(true)
    @mainPanel.element.outerHeight true, @element.height() - (offset1 + offset2)
    @toolbar.adjust()
    @statusbar.adjust()
    @mainPanel.adjust()
    return @

  update: (force) ->
    if @mainPanel.editorPanel and @mainPanel.viewerPanel
      @mainPanel.viewerPanel.update @mainPanel.editorPanel.val(), force


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

namespace 'Jencil.workspace', (exports) ->
  exports.Wrapper = Wrapper
  exports.Workspace = Workspace
  exports.Bar = Bar
  exports.Toolbar = Toolbar
  exports.Statusbar = Statusbar
