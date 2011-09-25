# --- core
namespace 'Jencil.core', (exports) ->
  exports.format = format = (formatstr, kwargs) ->
    ###
    Convert {{key}} string with kwargs
    ###
    for key, value of kwargs
      formatstr = formatstr.replace "{{#{key}}}", value
    return formatstr
  exports.JencilCore = class JencilCore
    ###
    Jencil core class
    ###
    constructor: (@$textarea, @options) ->
      @profile = undefined
      # --- construct wrapper
      @wrapper = new Jencil.widgets.Wrapper @
      # --- construct toolbar
      @buttonHolder = new Jencil.widgets.ButtonHolder @
      @documentType = new Jencil.widgets.DocumentType @
      @toolbar = new Jencil.widgets.Toolbar @
      @toolbar.append @buttonHolder
      @toolbar.append @documentType
      @wrapper.append @toolbar
      # --- construct workspace
      @workspace = new Jencil.widgets.Workspace @
      @wrapper.append @workspace
      # --- arrange
      @$textarea.after @wrapper.$element
      @$textarea.hide()
      # --- load default profile
      Jencil.profile.load @, @documentType.getProfileName()
    update: ->
      # --- change editor
      Jencil.editors.changeEditor @, @profile.editor, =>
        # --- update
        @buttonHolder.update()
        @editor().update()
    editor: ->
      return @_editor
    abspath: (path) ->
      return net.hashnote.path.abspath path, @options.root
