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
    profileSetUrl: '~/profiles'
    previewTemplateUrl: '~/templates/preview.html'
    previewPosition: 'right'
    defaultProfileName: 'html'
    defaultInsertText: '*'
    documentTypeElement: undefined
    }, options
  toAbsoluteUrl = (url) ->
    if url.startsWith '~/'
      url = "#{options.root}/#{url[2..url.length]}"
    return url
  # compute root path
  if not options.root?
    $('script').each (a, tag) ->
      match = $(tag).get(0).src.match /(.*)jencil(\.min)?\.js$/
      if match?
        options.root = match[1]
        options.root = options.root[0...options.root.length-1]
  # toAbsoluteUrl
  options.profileSetUrl = toAbsoluteUrl options.profileSetUrl
  options.previewTemplateUrl = toAbsoluteUrl options.previewTemplateUrl

  requires = [
    ["https://raw.github.com/lambdalisue/textarea.coffee/master/lib/textarea.js", 'window.Textarea']
    ["#{options.root}/jencil.widgets.js", 'window.Jencil.widgets']
    ["#{options.root}/jencil.buttons.js", 'window.Jencil.widgets.Button']
    ["#{options.root}/jencil.preview.js", 'window.Jencil.widgets.Preview']
  ]
  return @each ->
    Jencil.utils.load requires, =>
      class JencilEditor extends Textarea
        constructor: (textarea, options) ->
          super textarea
          @options = options
          # --- construct textarea
          @$textarea = $(@textarea)
          @$textarea.addClass 'jencil-textarea'
          @$textarea.wrap $('<div>').addClass 'jencil'
          # --- toolbar
          @buttonHolder = new Jencil.widgets.ButtonHolder @
          @documentType = new Jencil.widgets.DocumentType @
          @toolbar = new Jencil.widgets.Toolbar @
          @toolbar.append @buttonHolder
          @toolbar.append @documentType
          @$textarea.before @toolbar.$element
          # --- editor-area
          @editorArea = new Jencil.widgets.EditorArea @
          @preview = new Jencil.widgets.Preview @
          @$textarea.wrap @editorArea.$element
          @$textarea.after @preview.$element
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
