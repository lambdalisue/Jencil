###
Jencil editor
###
namespace 'Jencil.editors', (exports) ->
  Widget = Jencil.widgets.Widget
  exports.changeEditor = changeEditor = (jencil, name, callback) ->
    cls = Jencil.editors[name]
    if not cls?
      throw new Error "Unknown editor name is passed (name: #{name})"
    # --- setup to use the editor
    initializer = new cls.Initializer jencil
    # --- extends options.extra
    jencil.options.extras = $.extend true, initializer.options, jencil.options.extras
    # --- load editor css
    Jencil.theme.loadall initializer.stylesheets
    # --- load extra required libraries and change editor
    requires = initializer.requires
    for i in [0...requires.length]
      requires[i] = net.hashnote.path.abspath requires[i], jencil.options.root
    net.hashnote.module.loadall requires, =>
      # --- remove current editor
      jencil._editor?.$element.remove()
      delete jencil._editor
      # --- construct new editor via profile
      jencil._editor = new cls jencil
      jencil._editor.initializer = initializer
      jencil.workspace.append jencil._editor
      # --- call callback
      callback()
  exports.InitializerBase = class InitializerBase
    requires: []
    stylesheets: []
    options: []
    constructor: (jencil) ->
      for i in [0...@requires.length]
        @requires[i][0] = jencil.abspath @requires[i][0]
      for i in [0...@stylesheets.length]
        @stylesheets[i][0] = Jencil.theme.abspath @stylesheets[i][0]
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

