###
Jencil

Javascript cross-browser WYSIWYM and WYSIWYG editor written in CoffeeScript

:Author: Alisue (lambdalisue@hashnote.net)
:Version: 0.0.1rc4
:License: MIT License
:Url: http://github.com/lambdalisue/Jencil
###
window.namespace = (target, name, block) ->
  [target, name, block] = [(if typeof exports isnt 'undefined' then exports else window), arguments...] if arguments.length < 3
  top    = target
  target = target[item] or= {} for item in name.split '.'
  block target, top
namespace 'net.hashnote.css', (exports) ->
  exports.include = include = (url, media='all') ->
    ###
    Include outer stylesheet dynamically

    Args:
        url - an outer stylesheet url
    ###  
    link = document.createElement 'link'
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.media = media
    link.href = url
    document.head = document.head or document.getElementsByTagName('head')[0];
    document.head.appendChild link
  exports.remove = remove = (pattern) ->
    pattern = new RegExp "(.*)#{pattern}$"
    $('link').each (a, tag) ->
      match = $(tag).get(0).href.match pattern
      if match?
        $(tag).remove()
namespace 'net.hashnote.module', (exports) ->
  exports.include = include = (url) ->
    ###
    Include outer javascript dynamically

    Args:
        url - an outer javascript url
    ###  
    script = document.createElement 'script'
    script.type = 'text/javascript'
    script.src = url
    document.head = document.head or document.getElementsByTagName('head')[0];
    document.head.appendChild script
  exports.load = load = (url, check, callback, timeout=5000) ->
    ###
    Load outer javascript and execute callback after loaded

    Args:
        url - an outer javascript url
        check - checking expression written in string.
        callback - a callback function

    Example:
        # --- foobar.js
        Foobar = (function(message){
            this.message = message;
        });
        Foobar.prototype.say = function(){
            alert(this.message);
        };
        # --- main.js
        net.hashnote.module.load('foobar.js', 'window.Foobar', function(){
            var foobar = new Foobar("Hello");
            foobar.say();
        });
    ###
    if window.console?.info? then console.info "Loading '#{url}'..."
    _check = new Function "return !!(#{check})"
    if not _check()
      include url
      setTimeout ->
        timeout = undefined
      , timeout
      setTimeout ->
        if not timeout?
          if window.console?.error? then console.error "Loading '#{url}' has timed out!"
        else if not _check()
          setTimeout arguments.callee, 100
        else
          if window.console?.info? then console.info "ok"
          callback?()
      , 10
    else
      callback?()
  exports.loadall = loadall = (sets, callback, timeout=5000) ->
    ###
    Load all modules and execute callback after loaded

    Args:
        sets - a sets of url and check
        callback a callback function
        timeout - timeout in second (ambiguous)

    Example:
        net.hashnote.module.loadall([['foobar.js', 'window.Foobar'], ['hogehoge.js', 'window.Hogehoge']], function(){
            alert("Everything has loaded.");
        });
    ###
    cursor = -1
    next = ->
      cursor += 1
      if cursor == sets.length
        callback?()
      else
        load sets[cursor][0], sets[cursor][1], next, timeout
    next()
namespace 'net.hashnote.path', (exports) ->
  exports.root = root = (pattern) ->
    ###
    Get root path of script

    Args:
      pattern - a pattern of script name written in <script> src tag

    Example:
      alert(net.hashnote.path.root('jquery(\.min)?\.js'));
    ###
    pattern = new RegExp "(.*)#{pattern}$"
    root = undefined
    $('script').each (a, tag) ->
      match = $(tag).get(0).src.match pattern
      if match?
        root = match[1]
        # remove trailing slush
        root = root[0..root.length-2]
        return
    return root
  exports.abspath = abspath = (path, root, prefix='~/') ->
    ###
    Convert relativepath to absolutepath

    Args:
      path - a relativepath
      root - script root path, use ``net.hashnote.path.root`` for find it
      prefix - a prefix string. default is '~/'
    ###
    if path?.lastIndexOf(prefix, 0) is 0
      path = "#{root}/#{path[2..path.length]}"
    return path
namespace 'Jencil.theme', (exports) ->
  exports.root = undefined
  exports.init = (options) ->
    exports.root = options.themeSetPath
    load options.defaultThemeName
  exports.abspath = abspath = (path) ->
    return net.hashnote.path.abspath path, Jencil.theme.current
  exports.load = load = (name) ->
    if Jencil.theme.current?
      # --- remove current theme
      net.hashnote.css.remove "#{Jencil.theme.current}/.*\.css"
    Jencil.theme.current = "#{Jencil.theme.root}/#{name}"
    url = "#{Jencil.theme.current}/style.css"
    media = 'screen, projection'
    net.hashnote.css.include url, media
    # --- load current editor css
    if Jencil.jencils?
      for jencil in Jencil.jencils
        editorClass = jencil.editor().constructor
        initializer = new editorClass.Initializer jencil
        loadall initializer.stylesheets
  exports.loadall = loadall = (sets) ->
    for set in sets
      [url, media] = set
      media ?= 'screen, projection'
      net.hashnote.css.include abspath(url), media
namespace 'Jencil.loader', (exports) ->
  exports.Loader = class Loader
    ###
    Jencil loader. This loader is for inform user to Jencil is currently loading outer scripts.
    ###
    constructor: (textarea, @options) ->
      @$element = $('<div>').addClass 'jencil'
      @$element.addClass 'jencil-loader'
      @$textarea = $(textarea)
      @$textarea.after @$element
      @$textarea.hide()
      @options.documentTypeElement?.hide()
      @$element.show()
    dispose: ->
      # Remove loader element
      @$element.remove()
      # Show all related element except textarea
      @options.documentTypeElement?.show()
# --- Add string prototypes
String.prototype.startsWith = (prefix) ->
  return @lastIndexOf(prefix, 0) is 0
String.prototype.endsWith = (suffix) ->
  return @indexOf(suffix, this.length - suffix.length) isnt -1
$ = jQuery
$.fn.jencil = (options) ->
  options = $.extend true, {
    root: undefined
    editorSetPath: '~/editors'
    profileSetPath: '~/profiles'
    themeSetPath: '~/themes'
    defaultProfileName: 'wysiwyg'
    defaultThemeName: 'default'
    defaultInsertText: '<< any text >>'
    documentTypeElement: undefined
    extras: {}
    requires: [
      ['~/jencil.core.min.js', 'window.Jencil.core']
      ['~/jencil.widgets.min.js', 'window.Jencil.widgets']
      ['~/jencil.buttons.min.js', 'window.Jencil.buttons']
      ['~/jencil.editors.min.js', 'window.Jencil.editors']
      ['~/jencil.profile.min.js', 'window.Jencil.profile']
    ]
    editors: [
      ['~/editors/jencil.texteditor.min.js', 'window.Jencil.editors.TextEditor']
      ['~/editors/jencil.richeditor.min.js', 'window.Jencil.editors.RichEditor']
    ]
  }, options
  # Check documentTypeElement
  if @.length > 1 and options.documentTypeElement?
    if window.console?.warn?
      console.warn "documentTypeElement is not avaialble on multiple textarea"
      options.documentTypeElement = undefined
  # --- parse options
  options.root ?= net.hashnote.path.root 'jencil(\.min)?\.js'
  options.profileSetPath = net.hashnote.path.abspath options.profileSetPath, options.root
  options.themeSetPath = net.hashnote.path.abspath options.themeSetPath, options.root
  for i in [0...options.requires.length]
    options.requires[i][0] = net.hashnote.path.abspath options.requires[i][0], options.root
  for i in [0...options.editors.length]
    options.editors[i][0] = net.hashnote.path.abspath options.editors[i][0], options.root
  # --- initialize theme
  Jencil.theme.init options
  # --- create loader to each textarea
  loaders = []
  @each ->
    loaders.push new Jencil.loader.Loader @, options
  # --- build load script list
  requires = options.requires
  requires = requires.concat options.editors
  net.hashnote.module.loadall requires, =>
    # --- dispose loaders
    for loader in loaders
      loader.dispose()
    # --- attach Jencil to each textarea
    if not Jencil.jencils? then Jencil.jencils = []
    return @each ->
      Jencil.jencils.push new Jencil.core.JencilCore $(@), options
