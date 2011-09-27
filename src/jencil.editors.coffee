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
      requires[i][0] = net.hashnote.path.abspath requires[i][0], jencil.options.root
    # remove everything include loader
    jencil.workspace.$element.children().remove()
    # add new loader, it will be removed when correct editor has loaded
    jencil.workspace.append new Jencil.editors.Loader jencil
    net.hashnote.module.loadall requires, =>
      # --- construct new editor via profile
      jencil._editor = new cls jencil
      # --- remove everything include loader
      jencil.workspace.$element.children().remove()
      jencil.workspace.append jencil.editor()
      jencil.editor().init()
      # --- call callback
      callback()
  exports.Initializer = class Initializer
    requires: []
    stylesheets: []
    options: []
    constructor: (jencil) ->
      for i in [0...@requires.length]
        @requires[i][0] = jencil.abspath @requires[i][0]
  exports.Loader = class Loader extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil-editor'
      @$element.addClass 'jencil-loader'
    
  exports.EditorBase = class EditorBase extends Widget
    ###
    An abstruct class of Jencil editor
    ###
    @Initializer: Initializer
    constructor: (jencil, cls, type) ->
      super jencil, cls, type
      @$element.addClass 'jencil-editor'
    init: ->
      ###
      Initialize function. This function is called after everything has constructed.
      ###
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
