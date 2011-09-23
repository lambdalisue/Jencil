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
$ = jQuery
$.fn.jencil = (options) ->
  options = $.extend true, {
    root: undefined
    profilesetPath: '~/profiles'
    defaultProfileName: 'html'
    defaultInsertText: '*'
    documentTypeElement: undefined
    }, options
  # compute root path
  if not options.root?
    $('script').each (a, tag) ->
      match = $(tag).get(0).src.match /(.*)jencil(\.min)?\.js$/
      if match?
        options.root = match[1]
        options.root = options.root[0...options.root.length-1]
  # compute profileset path
  if options.profilesetPath.lastIndexOf('~/', 0) is 0
    path = options.profilesetPath[2...options.profilesetPath.length]
    options.profilesetPath = "#{options.root}/#{path}"
  requires = [
    ["#{options.root}/textarea.js", 'window.Textarea']
    ["#{options.root}/jencil.widgets.js", 'window.Jencil.widgets']
    ["#{options.root}/jencil.buttons.js", 'window.Jencil.widgets.Button']
  ]
  return @each ->
    Jencil.utils.load requires, =>
      class JencilEditor extends Textarea
        constructor: (textarea, options) ->
          super textarea
          @options = options
          # --- construct textarea
          $textarea = $(@textarea)
          $textarea.addClass 'jencil-textarea'
          $textarea.wrap $('<div>').addClass 'jencil'
          @buttonHolder = new Jencil.widgets.ButtonHolder @
          @documentType = new Jencil.widgets.DocumentType @
          @toolbar = new Jencil.widgets.Toolbar @
          # functionBar
          @toolbar.append @buttonHolder
          @toolbar.append @documentType
          $textarea.before @toolbar.$element
      new JencilEditor @, options

String.prototype.startsWith = (prefix) ->
  return this.lastIndexOf(prefix, 0) is 0
String.prototype.endsWith = (suffix) ->
  return this.indexOf(suffix, this.length - suffix.length) isnt -1

namespace 'Jencil.utils', (exports) ->
  exports.load = load = (sets, callback=undefined) ->
    _import = (url) ->
      script = document.createElement "script"
      script.type = "text/javascript"
      script.src = url
      document.head.appendChild script
    _load = (url, check, callback) ->
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
