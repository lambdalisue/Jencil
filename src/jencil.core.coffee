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
      # --- remove current editor
      @_editor?.$element.remove()
      delete @_editor
      # --- construct new editor via profile
      @_editor = new Jencil.editors[@profile.editor] @
      @workspace.append @_editor
      # --- update
      @buttonHolder.update()
      @editor().update()
    editor: ->
      return @_editor
    utils:
      abspath: (path) ->
        return net.hashnote.path.abspath path, @options.root
