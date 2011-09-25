# --- Add string prototypes
String.prototype.startsWith = (prefix) ->
  return @lastIndexOf(prefix, 0) is 0
String.prototype.endsWith = (suffix) ->
  return @indexOf(suffix, this.length - suffix.length) isnt -1
# --- core
namespace 'Jencil.core', (exports) ->
  exports.Jencil = class JencilCore
    constructor: (@$textarea, @options) ->
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
      @load @documentType.getProfileName()
    load: (profileName) ->
      delete Jencil.profile # force reload
      url = "#{@options.profileSetPath}/#{profileName}.js"
      check = 'Jencil.profile'
      net.hashnote.module.load url, check, =>
        @update()
    update: ->
      # Create new editor from string
      cls = Jencil.editors[Jencil.profile.editor]
      @workspace.$element.children().remove()
      @_editor = new cls @
      @workspace.append @_editor
      # Update
      @buttonHolder.update()
      @editor().update()
    abspath: (path) ->
      return net.hashnote.path.abspath path, @options.root
    editor: ->
      return @_editor

