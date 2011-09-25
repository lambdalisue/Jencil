###
Jencil editor
###
namespace 'Jencil.editors', (exports) ->
  Widget = Jencil.widgets.Widget
  exports.changeEditor = changeEditor = (jencil, name, callback) ->
    cls = Jencil.editors[name]
    if not cls?
      throw new Error "Unknown editor name is passed (name: #{name})"
    # --- call setup function
    cls.setUp jencil
    # --- extends options.extra
    jencil.options.extras = $.extend true, cls.options, jencil.options.extras
    # --- load editor css
    Jencil.theme.loadEditorCSS cls
    # --- load extra required libraries and change editor
    requires = cls.requires
    for i in [0...requires.length]
      requires[i] = net.hashnote.path.abspath requires[i], jencil.options.root
    net.hashnote.module.loadall requires, =>
      # --- call teardown function
      jencil.editor()?.constructor.tearDown jencil
      # --- remove current editor
      jencil._editor?.$element.remove()
      delete jencil._editor
      # --- construct new editor via profile
      jencil._editor = new cls jencil
      jencil.workspace.append jencil._editor
      # --- call callback
      callback()
  exports.Setup = class Setup
    constructor: (jencil) ->
      #
    requires: []
    stylesheets: []
    options: []
  exports.EditorBase = class EditorBase extends Widget
    ###
    An abstruct class of Jencil editor
    ###
    constructor: (jencil, cls, type) ->
      super jencil, cls, type
    update: ->
      ###
      Update editor. Subclass should override this method to update anything related to the editor
      ###
    getValue: ->
      throw new Error "Subclass must override this method."
    getSelection: ->
      throw new Error "Subclass must override this method."
    setSelection: (start, end) ->
      throw new Error "Subclass must override this method."
    getSelected: ->
      throw new Error "Subclass must override this method."
    replaceSelected: (str, select=false) ->
      throw new Error "Subclass must override this method."
    insertBeforeSelected: (str, select=false) ->
      throw new Error "Subclass must override this method."
    insertAfterSelected: (str, select=false) ->
      throw new Error "Subclass must override this method."
    wrapSelected: (before, after, select=false, additional=undefined) ->
      throw new Error "Subclass must override this method."

