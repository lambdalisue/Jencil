# --- Add string prototypes
String.prototype.startsWith = (prefix) ->
  return @lastIndexOf(prefix, 0) is 0
String.prototype.endsWith = (suffix) ->
  return @indexOf(suffix, this.length - suffix.length) isnt -1
# --- core
namespace 'Jencil.core', (exports) ->
  exports.parse = parse = (options) ->
    findroot = (options) ->
      $('script').each (a, tag) ->
        match = $(tag).get(0).src.match /(.*)jencil(\.min)?\.js$/
        if match?
          options.root = match[1]
          # remove trailing slush
          return options.root[0..options.root.length-1]
    abspath = (path, root, prefix='~/') ->
      if path.startsWith '~/'
        path = "#{root}/#{path[2..path.length]}"
      return path
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
      @$textarea.wrap @$element
      # --- construct toolbar
      @buttonHolder = new Jencil.widgets.ButtonHolder @
      @documentType = new Jencil.widgets.DocumentType @
      @toolbar = new Jencil.widgets.Toolbar @
      @toolbar.append @buttonHolder
      @toolbar.append @documentType
      # --- construct workspace
      @workspace = new Jencil.widgets.Workspace @
      @wysiwym = new Jencil.widgets.Wysiwym @
      @wysiwyg = new Jencil.widgets.Wysiwyg @
      # --- arrange
      @$textarea.before @toolbar.$element
      @$textarea.wrap @workspace.$element
      @$textarea.after @wysiwyg.$element
      @$textarea.wrap @wysiwym.$element
      @$textarea.after @wysiwym.preview.$element
    editor: ->
      return @wysiwym



      


