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
namespace 'Jencil.utils', (exports) ->
  exports.load = load = (sets, callback=undefined) ->
    _import = (url) ->
      script = document.createElement "script"
      script.type = "text/javascript"
      script.src = url
      document.head.appendChild script
    _load = (url, check, callback) ->
      console.log "Loading #{url} ..."
      _check = new Function "return !!(#{check})"
      if not _check()
        _import url
        setTimeout ->
          if not _check()
            setTimeout arguments.callee, 100
          else if callback?
            callback()
        , 100
      else if callback?
        callback()
    cursor = -1
    _next = ->
      cursor += 1
      if cursor == sets.length
        if callback? then callback()
      else
        url = sets[cursor][0]
        check = sets[cursor][1]
        _load url, check, _next
    _next()
    return null
$ = jQuery
$.fn.jencil = (options) ->
  options = $.extend true, {
    root: undefined
    profileSetPath: '~/profiles'
    previewTemplatePath: '~/templates/preview.html'
    previewParserSets: 
      http: undefined
      markdown: undefined
    previewPosition: 'right'
    defaultProfileName: 'html'
    defaultInsertText: '*'
    documentTypeElement: undefined
  }, options
  # --- develop mode code
  requires = [
    ['js/textarea.min.js', 'window.Textarea']
    ['js/jencil/jencil.core.js', 'window.Jencil.core']
    ['js/jencil/jencil.widgets.js', 'window.Jencil.widgets']
    ['js/jencil/jencil.buttons.js', 'window.Jencil.widgets.Button']
    ['js/jencil/jencil.wysiwym.js', 'window.Jencil.widgets.Wysiwym']
    ['js/jencil/jencil.wysiwyg.js', 'window.Jencil.widgets.Wysiwyg']
  ]
  # --- /develop mode code
  Jencil.utils.load requires, =>
    options = Jencil.core.parse options
    return @each ->
      new Jencil.core.Jencil $(@), options


