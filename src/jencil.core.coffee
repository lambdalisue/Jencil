# --- Add string prototypes
String.prototype.startsWith = (prefix) ->
  return @lastIndexOf(prefix, 0) is 0
String.prototype.endsWith = (suffix) ->
  return @indexOf(suffix, this.length - suffix.length) isnt -1
# --- core
namespace 'Jencil.core', (exports) ->
  exports.abspath = abspath = (path, root, prefix='~/') ->
    if path.startsWith '~/'
      path = "#{root}/#{path[2..path.length]}"
    return path
  exports.parse = parse = (options) ->
    findroot = (options) ->
      $('script').each (a, tag) ->
        match = $(tag).get(0).src.match /(.*)jencil(\.min)?\.js$/
        if match?
          options.root = match[1]
          # remove trailing slush
          return options.root[0..options.root.length-1]
    # findroot if required
    if not options.root? then findroot options
    # convert to abspath
    options.profileSetPath = abspath options.profileSetPath, options.root
    options.previewTemplatePath = abspath options.previewTemplatePath, options.root
    return options
  exports.Jencil = class JencilCore
    constructor: (@$textarea, @options) ->
      # --- construct wrapper
      @$element = $('<div>').addClass 'jencil'
      @$textarea.after @$element
      @$textarea.hide()
      # --- construct toolbar
      @buttonHolder = new Jencil.widgets.ButtonHolder @
      @documentType = new Jencil.widgets.DocumentType @
      @toolbar = new Jencil.widgets.Toolbar @
      @toolbar.append @buttonHolder
      @toolbar.append @documentType
      # --- construct workspace
      @workspace = new Jencil.widgets.Workspace @
      @texteditor = new Jencil.widgets.TextEditor @
      @richeditor = new Jencil.widgets.RichEditor @
      @workspace.append @texteditor
      @workspace.append @richeditor
      # --- arrange
      @$element.append @toolbar.$element
      @$element.append @workspace.$element
    abspath: (path) ->
      return Jencil.core.abspath path, @options.root
    editor: ->
      return @texteditor
