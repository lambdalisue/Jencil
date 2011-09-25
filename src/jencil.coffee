###
Jencil

Cross browser Markup and WYSIWYG editor

:Author: Alisue (lambdalisue@hashnote.net)
:License: MIT License
:Url: http://github.com/lambdalisue/Jencil
###
window.namespace = (target, name, block) ->
  [target, name, block] = [(if typeof exports isnt 'undefined' then exports else window), arguments...] if arguments.length < 3
  top    = target
  target = target[item] or= {} for item in name.split '.'
  block target, top
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
        return root[0..root.length-1]
    return root
  exports.abspath = abspath = (path, root, prefix='~/') ->
    ###
    Convert relativepath to absolutepath

    Args:
      path - a relativepath
      root - script root path, use ``net.hashnote.path.root`` for find it
      prefix - a prefix string. default is '~/'
    ###
    if path.lastIndexOf('~/', 0) is 0
      path = "#{root}/#{path[2..path.length]}"
    return path
$ = jQuery
$.fn.jencil = (options) ->
  options = $.extend true, {
    root: undefined
    profileSetPath: '~/profiles'
    previewTemplatePath: '~/templates/preview.html'
    previewPosition: 'right'
    defaultProfileName: 'html'
    defaultInsertText: '*'
    documentTypeElement: undefined
    requires: [
      ['~/textarea.min.js', 'window.Textarea']
      ['~/jencil.core.min.js', 'window.Jencil']
      ['~/jencil.widgets.min.js', 'window.Jencil.widgets']
      ['~/jencil.buttons.min.js', 'window.Jencil.widgets.Button']
      ['~/jencil.texteditor.min.js', 'window.Jencil.editors.TextEditor']
      ['~/jencil.richeditor.min.js', 'window.Jencil.editors.RichEditor']
    ]
    extras: [
      ['http://teddevito.com/demos/js/jquery.textarea.js', '$.fn.tabby']      # required to enable TAB feature on TextEditor
    ]
  }, options
  if @.length > 1 and options.documentTypeElement?
    if window.console?.warn?
      console.warn "documentTypeElement is not avaialble on multiple textarea"
      options.documentTypeElement = undefined
  # --- hide object
  $$ = $(@)
  $$.hide()
  options.documentTypeElement?.hide()
  # --- add loading frame
  $loading = $('<div>').addClass 'jencil-loading'
  $$.after $loading
  # --- parse options
  options.root ?= net.hashnote.path.root 'jencil(\.min)?\.js'
  options.profileSetPath = net.hashnote.path.abspath options.profileSetPath, options.root
  options.previewTemplatePath = net.hashnote.path.abspath options.previewTemplatePath, options.root
  for i in [0...options.requires.length]
    options.requires[i][0] = net.hashnote.path.abspath options.requires[i][0], options.root
  for i in [0...options.extras.length]
    options.extras[i][0] = net.hashnote.path.abspath options.extras[i][0], options.root
  # --- build load script list
  requires = options.requires.concat options.extras
  net.hashnote.module.loadall requires, =>
    $loading.remove()
    options.documentTypeElement?.show()
    return @each ->
      new Jencil.core.Jencil $(@), options
