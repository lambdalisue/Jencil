###!
Jencil - A JavaScript Cross-browser WYSIWYM and WYSIWYG editor v0.0.2
http://lambdalisue.github.com/Jencil

Copyright 2011 (c) hashnote.net, Alisue allright reserved.
Licensed under the MIT license.

Dependencies:
- jQuery v1.4.2
  http://jquery.com/
- Tabby jQuery plugin v0.12
  http://teddevito.com/demos/textarea.html
- Textarea v0.1.0 (included)
  http://demos.textarea.hashnote.net/
- Richarea v0.1.1 (included)
  http://demos.richarea.hashnote.net/

Includes Tabby jQuery plugin v0.12
  http://teddevito.com/demos/textarea.html
  Copyright (c) 2009 Ted Devito

Includes Textarea v0.1.0
  http://demos.textarea.hashnote.net/
  Copyright (c) 2011 hashnote.net, Alisue allright reserved

Includes Richarea v0.1.1 (included)
  http://demos.richarea.hashnote.net/
  Copyright (c) 2011 hashnote.net, Alisue allright reserved

Last-Modified: Thu, 06 Oct 2011 09:30:53 GMT
###

###
Detect browser name, version and OS

@ref: http://www.quirksmode.org/js/detect.html
###
class Detector
  constructor: ->
    @browser = @searchString(Detector.dataBrowser) or "An unknown browser"
    @version = @searchVersion(navigator.userAgent) or @searchVersion(navigator.appVersion) or "An unknown browser"
    @OS = @searchString(Detector.dataOS) or "An unknown OS"
  searchString: (data) ->
    for row in data
      @versionSearchString = row.versionSearch or row.identify
      if row.string?
        if row.string.indexOf(row.subString) isnt -1
          return row.identify
        else if row.prop
          return row.identify
  searchVersion: (dataString) ->
    index = dataString.indexOf @versionSearchString
    if index is -1 then return
    return parseFloat dataString.substring(index+@versionSearchString.length+1)
  @dataBrowser: [
    {string: navigator.userAgent, subString: 'Chrome', identify: 'Chrome'}
    {string: navigator.userAgent, subString: 'OmniWeb', versionSearch: 'OmniWeb/', identify: 'OmniWeb'}
    {string: navigator.vendor, subString: 'Apple', identify: 'Safari', versionSearch: 'Version'}
    {prop: window.opera, identify: 'Opera', versionSearch: 'Version'}
    {string: navigator.vendor, subString: 'iCab', identify: 'iCab'}
    {string: navigator.vendor, subString: 'KDE', identify: 'Konqueror'}
    {string: navigator.userAgent, subString: 'Firefox', identify: 'Firefox'}
    {string: navigator.vendor, subString: 'Camino', identify: 'Camino'}
    {string: navigator.userAgent, subString: 'Netscape', identify: 'Netscape'}
    {string: navigator.userAgent, subString: 'MSIE', identify: 'Explorer', versionSearch: 'MSIE'}
    {string: navigator.userAgent, subString: 'Gecko', identify: 'Mozilla', versionSearch: 'rv'}
    {string: navigator.userAgent, subString: 'Mozilla', identify: 'Netscape', versionSearch: 'Mozilla'}
  ]
  @dataOS: [
    {string: navigator.platform, subString: 'Win', identify: 'Windows'}
    {string: navigator.platform, subString: 'Mac', identify: 'Mac'}
    {string: navigator.userAgent, subString: 'iPhone', identify: 'iPhone/iPad'}
    {string: navigator.platform, subString: 'Linux', identify: 'Linux'}
  ]
exports?.Detector = Detector

window.namespace = (target, name, block) ->
  [target, name, block] = [(if typeof exports isnt 'undefined' then exports else window), arguments...] if arguments.length < 3
  top    = target
  target = target[item] or= {} for item in name.split '.'
  block target, top
exports?.namespace = namespace

###
dynamicloader

CoffeeScript dynamic javascript load utils.

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

###
namespace @, 'dynamicloader.script', (exports) ->
  exports.include = include = (url) ->
    script = document.createElement 'script'
    script.type = 'text/javascript'
    script.src = url
    document.head = document.head or document.getElementsByTagName('head')[0];
    document.head.appendChild script
  exports.load = load = (url, check, callback, timeout=5000) ->
    _check = new Function "return !!(#{check})"
    if not _check()
      include url
      setTimeout -> 
        timeout = true
      , timeout
      setTimeout ->
        if timeout isnt true and not _check()
          setTimeout arguments.callee, 100
        else callback?()
      , 100
    else callback?()
  exports.loadall = (sets, callback, timeout=5000) ->
    cursor = 0
    process = ->
      url = sets[cursor][0]
      check = sets[cursor][1]
      cursor++
      if cursor > sets.length then callback?() else load url, check, next
    next()
namespace 'dynamicloader.css', (exports) ->
  exports.include = (url, media='all') ->
    link = document.createElement 'link'
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.media = media
    link.href = url
    document.head = document.head or document.getElementsByTagName('head')[0];
    document.head.appendChild link
  exports.remove = (pattern) ->
    $('link').each (a, tag) ->
      match = tag.href.match pattern
      if match? then $(tag).remove()

###
Jencil core

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Dependencies:
- Jencil.options (jencil.options.js)
- Jencil.utils.path (jencil.utils.js)
- Jencil.theme (jencil.theme.js)
###
if not String.prototype.startsWith?
  String.prototype.startsWith = (str) ->
    @lastIndexOf(str, 0) is 0
if not String.prototype.endsWith?
  String.prototype.endsWith = (suffix) ->
    offset = @length - suffix.length
    offset >= 0 and @lastIndexOf(suffix, offset) is offset
if not String.prototype.replaceAll?
  String.prototype.replaceAll = (search, replace) ->
    @split(search).join(replace)
if not String.prototype.trim?
  String.prototype.trim = ->
    @replace /^\s+|\s+$/g, ''
$ = jQuery
$.fn.jencil = (options) ->
  options = $.extend true, Jencil.options.default, options
  # Check documentTypeElement
  if @.length > 1 and options.documentTypeElement?
    logger.warn 'documentTypeElement is not avaialble on multiple textarea'
    options.documentTypeElement = undefined
  # initialize
  Jencil.utils.path.init options
  Jencil.theme.init options
  # --- attach Jencil to each textarea
  if not Jencil.jencils? then Jencil.jencils = []
  return @each ->
    Jencil.jencils.push new Jencil.core.JencilCore $(@), options
namespace 'Jencil.core', (exports) ->
  exports.JencilCore = class JencilCore
    constructor: (@$textarea, @options) ->
      @profile = undefined
      # --- construct wrapper
      @wrapper = new Jencil.widget.Wrapper @
      # --- construct toolbar
      @buttonHolder = new Jencil.widget.ButtonHolder @
      @documentType = new Jencil.widget.DocumentType @
      @toolbar = new Jencil.widget.Toolbar @
      @toolbar.append @buttonHolder
      @toolbar.append @documentType
      @wrapper.append @toolbar
      # --- construct workspace
      @workspace = new Jencil.widget.Workspace @
      @wrapper.append @workspace
      # --- arrange
      @$textarea.after @wrapper.$element
      @$textarea.hide()
      # --- load default profile
      Jencil.profile.load @, @getProfileName()
    update: ->
      @workspace.use @profile.editor, =>
        @buttonHolder.update()
        @workspace.editor.update()
    getProfileName: ->
      @documentType.getProfileName()
    getSourceValue: ->
      @$textarea.val()
    setSourceValue: (value) ->
      @$textarea.val value

###
Jencil utils

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- namespace (namespace.js)
- Detector (detector.js)
- dynamicloader (dynamicloader.js)
###
namespace 'Jencil.utils', (exports) ->
  exports.detector = new Detector
namespace 'Jencil.utils.path', (exports) ->
  exports.init = (options) ->
    exports.path = new Path options.root ? options.rootPattern ? /(.*)jencil(\.min)?\.js/
  exports.abspath = (path, root, prefix='~/') ->
    exports.path.abspath path, root, prefix
  exports.Path = class Path
    constructor: (pattern) ->
      if pattern instanceof RegExp
        $('script').each (a, tag) =>
          match = tag.src.match pattern
          if match?
            @root = match[1]
            # remove trailing slush
            return @root = @root[0..@root.length-2]
      else
        @root = pattern
    abspath: (path, root, prefix='~/') ->
      root ?= @root
      if path?.startsWith prefix
        path = "#{root}/#{path[2..path.length]}"
      return path
namespace 'Jencil.utils.script', (exports) ->
  exports.load = (url, check, callback) ->
    dynamicloader.script.load Jencil.utils.path.abspath(url), check, callback
  exports.loadall = (sets, callback) ->
    cursor = 0
    process = ->
      url = sets[cursor][0]
      check = sets[cursor][1]
      cursor++
      if cursor > sets.length then callback?() else Jencil.utils.module.load url, check, next
    process()
namespace 'Jencil.utils.css', (exports) ->
  exports.include = (url, media = 'all') ->
    dynamicloader.css.include url
  exports.remove = (pattern) ->
    dynamicloader.css.remove pattern
namespace 'Jencil.utils.string', (exports) ->
  exports.format = format = (formatstr, kwargs) ->
    for key, value of kwargs
      formatstr = formatstr.replace "{{#{key}}}", value
    return formatstr

###
Jencil options

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

###
namespace 'Jencil.options', (exports) ->
  exports.default =
    debug: true
    root: null
    rootPattern: null
    theme:
      root: '~/extras/themes'
      default: 'default'
    profile:
      root: '~/extras/profiles'
      default: 'default'

###
Jencil profile

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Dependencies:
- Jencil.utils.path (jencil.utils.js)
- Jencil.utils.script (jencil.utils.js)
###
namespace 'Jencil.profile', (exports) ->
  exports.abspath = (path, jencil) ->
    if not path.endsWith '.js'
      path = "#{jencil.options.profile.root}/#{path}.js"
    return Jencil.utils.path.abspath path
  exports.load = (jencil, path) ->
    url = Jencil.profile.abspath path, jencil
    check = 'Jencil.profile.Profile'
    # remove profile to force reload
    delete Jencil.profile.Profile
    delete jencil.profile
    Jencil.utils.script.load url, check, ->
      jencil.profile = new Jencil.profile.Profile jencil
      jencil.update()

###
Jencil theme

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Dependencies:
- Jencil.utils.path (jencil.utils.js)
- Jencil.utils.css (jencil.utils.js)
###
namespace 'Jencil.theme', (exports) ->
  exports.root = undefined
  exports.init = (options) ->
    exports.root = Jencil.utils.path.abspath options.theme.root
    Jencil.theme.load options.theme.default
  exports.load = load = (name) ->
    if Jencil.theme.current?
      Jencil.utils.css.remove new RegExp "#{Jencil.theme.current}/.*\.css"
    Jencil.theme.current = Jencil.utils.path.abspath "#{Jencil.theme.root}/#{name}"
    url = "#{Jencil.theme.current}/style.css"
    media = 'screen, projection'
    Jencil.theme.include url, media
    # --- load current editor css
    if Jencil.jencils?
      for jencil in Jencil.jencils
        editorClass = jencil.workspace.editor.constructor
        Jencil.theme.includeall editorClass.extras.stylesheets if editorClass.extras?.stylesheets?
  exports.abspath = (path) ->
    Jencil.utils.path.abspath path, Jencil.theme.current
  exports.include = (url, media) ->
    url = Jencil.theme.abspath url
    Jencil.utils.css.include url, media
  exports.includeall = (stylesheets) ->
    for url in stylesheets
      Jencil.theme.include url, 'screen, projection'

###
Jencil widget

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Dependencies:
- Jencil.profile (jencil.profile.js)
- Jencil.button (jencil.button.js)
- Jencil.editor (jencil.editor.js)
###
namespace 'Jencil.widget', (exports) ->
  exports.Widget = class Widget
    constructor: (@jencil, @cls, type='div') ->
      @$element = $("<#{type}>").addClass cls
    after: (widget) ->
      @$element.after widget.$element
    append: (widget) ->
      @$element.append widget.$element
    appendTo: (widget) ->
      @$element.appendTo widget.$element
    before: (widget) ->
      @$element.before widget.$element
    prepend: (widget) ->
      @$element.prepend widget.$element
    prependTo: (widget) ->
      @$element.prependTo widget.$element
  exports.Wrapper = class Wrapper extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil'
  exports.DocumentType = class DocumentType extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil-document-type'
      @$documentTypeElement = @jencil.options.documentTypeElement
      if @$documentTypeElement?
        if @$documentTypeElement not instanceof jQuery
          @$documentTypeElement = $(@$documentTypeElement)
        @$element.append @$documentTypeElement
        @$documentTypeElement.change =>
          Jencil.profile.load @jencil, @getProfileName()
    getProfileName: ->
      if @$documentTypeElement?
        return @$documentTypeElement.val()
      return @jencil.options.profile.default
  exports.ButtonHolder = class ButtonHolder extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil-button-holder'
    update: () ->
      @$element.children().remove()
      for buttonset in @jencil.profile.buttonsets
        type = buttonset[0]
        args = buttonset[1..buttonset.length]
        button = Jencil.button.createButton @jencil, type, args
        @append button
  exports.Toolbar = class Toolbar extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil-toolbar'
  exports.Workspace = class Workspace extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil-workspace'
      @editor = null
    use: (name, callback) ->
      Jencil.editor.use @jencil, name, => callback()

###
Jencil button

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- Jencil.widget (jencil.widget.js)

Dependencies:
- Jencil.utils.detector (jencil.utils.js)
###
namespace 'Jencil.button', (exports) ->
  Widget = Jencil.widget.Widget
  exports.createButton = (jencil, type, args) ->
    cls = undefined
    switch type
      when '-', 'separator'
        cls = Jencil.button.Separator
      when '+', 'exec'
        cls = Jencil.button.ExecButton
      when 'preview'
        cls = Jencil.button.PreviewButton
      else
        cls = Jencil.button[type]
        if not cls? then throw new Error "Unknown button type is passed (type: #{type})"
    return new cls jencil, args
  # --- abstruct class
  exports.ButtonBase = class ButtonBase extends Widget
    constructor: (jencil, cls, name) ->
      super jencil, 'button', 'a'
      @$element.addClass cls
      @$element.attr 'title', name
      @$element.css 'cursor', 'pointer'
      # quickfix IE6 and IE7 hover issue
      if Jencil.utils.detector.browser is 'Explorer' and Jencil.utils.detector.version < 8
        @$element.attr 'href', 'javascript:void(0);'
      @$element.append $("<span>#{name}</span>")
      @$element.click =>
        @clickBefore()
        @click()
        @clickAfter()
    editor: ->
      return @jencil.workspace.editor
    clickBefore: ->
      # This method is called before click callback is called
    click: ->
      # This method is called when user click the button
    clickAfter: ->
      # This method is called after click callback is called
  exports.MarkupButtonBase = class MarkupButtonBase extends ButtonBase
    clickAfter: ->
      # Update editor
      @editor().update()
  # --- separator
  exports.Separator = class Separator extends Widget
    constructor: (jencil, args) ->
      super jencil, 'separator', 'span'
      @$element.append $('<span>|</span>')
  # --- execute buttons
  exports.ExecButton = class ExecButton extends ButtonBase
    constructor: (jencil, args) ->
      [cls, name, @_click, @_clickBefore, @_clickAfter] = args
      super jencil, cls, name
    clickBefore: ->
      @_clickBefore @editor()
    click: ->
      @_click @editor()
    clickAfter: ->
      @_clickAfter @editor()
  # --- preview button
  exports.PreviewButton = class PreviewButton extends ButtonBase
    constructor: (jencil, args) ->
      super jencil, 'preview', 'Preview'
    click: ->
      editor = @editor()
      editor.preview?.toggle()
      editor.relocate()

###
Jencil editor

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- Jencil.widget (jencil.widget.js)

Dependencies
- Jencil.utils.script (jencil.utils.js)
- Jencil.theme (jencil.theme.js)
###
namespace 'Jencil.editor', (exports) ->
  Widget = Jencil.widget.Widget
  getOffsetX = ($$) -> $$.outerWidth(true) - $$.width()
  getOffsetY = ($$) -> $$.outerHeight(true) - $$.height()
  exports.use = use = (jencil, name, callback=undefined) ->
    prepare = ->
      extras = Jencil.editor[name].extras
      if extras?.options?
        jencil.options.extras = $.extend true, extras.options, jencil.options.extras ? {}
      if extras?.stylesheets?
        Jencil.theme.includeall extras.stylesheets
      if extras?.requires?
        Jencil.utils.script.loadall extras.requires, ->
          process()
      else
        process()
    process = ->
      editorClass = Jencil.editor[name]
      # remove previous editor
      if jencil.workspace.editor?
        jencil.workspace.editor.$element.remove()
        jencil.workspace.editor = null
      # add new editor
      editor = new editorClass jencil
      jencil.workspace.append editor
      jencil.workspace.editor = editor
      editor.init()
      callback() if callback?
    if name instanceof Array
      [name, url, check] = name
      # load external editor script
      Jencil.utils.script.load url, check, ->
        prepare()
    else
      prepare()
  exports.EditorBase = class EditorBase extends Widget
    constructor: (jencil, cls) ->
      super jencil, cls
      @workspace = @jencil.workspace
      @$element.addClass 'jencil-editor'
      @$element.hide()
    init: -> 
      @$element.show()
      @relocate()
    update: -> 
      @relocate()
    relocate: ->
      # get offsets
      offsetX = getOffsetX @$element
      offsetY = getOffsetY @$element
      # store size
      width = @workspace.$element.width()
      height = @workspace.$element.height()
      @$element.width width - offsetX
      @$element.height height - offsetY
  exports.SinglePaneEditorBase = class SinglePaneEditorBase extends EditorBase
    constructor: (jencil, cls, @pane) ->
      super jencil, cls
      @pane.$element.appendTo @$element
      @pane.$element.addClass 'jencil-pane'
      @$element.addClass "jencil-siglepane-editor"
    init: ->
      @pane.init()
      super()
    update: ->
      @pane.update()
      super()
    relocate: ->
      super()
      # get each pane offsets
      offsetX = getOffsetX @pane.$element
      offsetY = getOffsetY @pane.$element
      # store size
      width = @$element.width()
      height = @$element.height()
      @pane.$element.width width-offsetX
      @pane.$element.height height-offsetY
  exports.DualPaneEditorBase = class DualPaneEditorBase extends EditorBase
    constructor: (jencil, cls, @lhspane, @rhspane, @panedir='horizontal') ->
      super jencil, cls
      @lhspane.$element.appendTo @$element
      @rhspane.$element.appendTo @$element
      @lhspane.$element.addClass 'jencil-lhspane'
      @rhspane.$element.addClass 'jencil-rhspane'
      @$element.addClass "jencil-panedir-#{@panedir}"
    init: ->
      @lhspane.init()
      @rhspane.init()
      super()
    update: ->
      @lhspane.update()
      @rhspane.update()
      super()
    relocate: ->
      super()
      # apply class before calculate
      if @lhspane.isVisible() and @rhspane.isVisible()
        @$element.removeClass 'jencil-singlepane-editor'
        @$element.addClass "jencil-dualpane-editor"
      else
        @$element.addClass 'jencil-singlepane-editor'
        @$element.removeClass "jencil-dualpane-editor"

      # get each pane offsets
      lhsOffsetX = getOffsetX @lhspane.$element
      rhsOffsetX = getOffsetX @rhspane.$element
      lhsOffsetY = getOffsetY @lhspane.$element
      rhsOffsetY = getOffsetY @rhspane.$element
      # store size
      width = @$element.width()
      height = @$element.height()
      if @lhspane.isVisible() and @rhspane.isVisible()
        if @panedir is 'horizontal'
          @lhspane.$element.css 'float': 'left'
          @rhspane.$element.css 'float': 'right'
          @lhspane.$element.width width/2-lhsOffsetX
          @rhspane.$element.width width/2-rhsOffsetX
          @lhspane.$element.height height-lhsOffsetY
          @rhspane.$element.height height-rhsOffsetY
        else
          @lhspane.$element.css 'float': 'none'
          @rhspane.$element.css 'float': 'none'
          @lhspane.$element.width width-lhsOffsetX
          @rhspane.$element.width width-rhsOffsetX
          @lhspane.$element.height height/2-lhsOffsetY
          @rhspane.$element.height height/2-rhsOffsetY
      else if @lhspane.isVisible()
        @lhspane.$element.css 'float': 'none'
        @lhspane.$element.width width-lhsOffsetX
        @lhspane.$element.height height-lhsOffsetY
      else
        @rhspane.$element.css 'float': 'none'
        @rhspane.$element.width width-rhsOffsetX
        @rhspane.$element.height height-rhsOffsetY
      @lhspane.relocate()
      @rhspane.relocate()

###
Jencil editor pane

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- Jencil.widget (jencil.widget.js)
- Jencil.editor (jencil.editor.js)

Dependencies:
- Jencil.utils.detector (jencil.utils.js)
- Jencil.utils.path (jencil.utils.js)
###
namespace 'Jencil.editor.pane', (exports) ->
  Widget = Jencil.widget.Widget
  exports.EditorPane = class EditorPane extends Widget
    constructor: (jencil, cls, @editor) ->
      super jencil, cls
      @_updateCallbacks = []
    init: -> @
    update: (callback) ->
      if callback? then @_updateCallbacks.push callback
      else
        callback() for callback in @_updateCallbacks
    isVisible: ->
      @$element.is ':visible'
    show: ->
      @update()
      @editor.$element.removeClass "#{@cls}-invisible"
      @$element.show()
    hide: -> 
      @editor.$element.addClass "#{@cls}-invisible"
      @$element.hide()
    toggle: ->
      if @isVisible() then @hide() else @show()
    relocate: -> 
      # Do nothing
  exports.PreviewPane = class PreviewPane extends EditorPane
    constructor: (jencil, editor) ->
      super jencil, 'jencil-preview-pane', editor
      @$element.css position: 'relative'
      @$surface = $('<div>').addClass 'surface'
      @$surface.appendTo @$element
      @$surface.css
        width: '100%'
        height: '100%'
        border: ''
        margin: 0
        padding: 0
        overflow: 'auto'
    _writeContent: (content) ->
      process = (template) =>
        @$surface.html template.replace '{{content}}', content
      if not @_previewTemplate?
        templatePath = Jencil.utils.path.abspath @jencil.options.extras.previewTemplatePath
        @$surface.load templatePath, (response, status, xhr) =>
          @_previewTemplate = response
          process response
      else
        process @_previewTemplate
    update: ->
      process = (content) =>
        @_writeContent content
        super()
      process.__super__ = super
      process2 = =>
        content = @editor.getValue()
        if @jencil.profile.extras?.previewParserPath?
          content = encodeURIComponent content
          $.ajax
            url: Jencil.utils.path.abspath @jencil.profile.extras.previewParserPath
            type: @jencil.profile.extras.previewParserMethod or 'GET'
            dataType: @jencil.profile.extras.previewParserType or 'text'
            data: "#{@jencil.profile.extras.previewParserVal or 'data'}=#{content}"
            success: (content) =>
              process content
        else
          process content
      if @jencil.profile? then process2()
      else
        setTimeout =>
          if @jencil.profile? then process2()
          else setTimeout arguments.callee, 100
        , 100
    relocate: ->
      super()
      # quickfix for IE 6 and 7, because they don't know '100%' mean.
      if Jencil.utils.detector.browser is 'Explorer' and Jencil.utils.detector.version < 8
        @$surface.height @$element.height()

###
Jencil TextEditor

A simple Dualpane Markup Editor with PreviewPane

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- Jencil.widget (jencil.widget.js)
- Jencil.editor (jencil.editor.js)
- Jencil.editor.pane (jencil.editor.pane.js)
- Jencil.button (jencil.button.js)

Dependencies:
- Jencil.utils.detector (jencil.utils.js)
- Textarea (textarea.js)
###
namespace 'Jencil.editor.pane', (exports) ->
  EditorPane = Jencil.editor.pane.EditorPane
  exports.TextareaPane = class TextareaPane extends EditorPane
    constructor: (jencil, editor) ->
      super jencil, 'jencil-textarea-pane', editor
      @$element.css position: 'relative'
      @$surface = $('<textarea>').addClass 'surface'
      @$surface.appendTo @$element
      @$surface.css
        width: '100%'
        height: '100%'
        border: 'none'
        margin: 0
        padding: 0
        resize: 'none'
        outline: 'none'
      @$surface.bind 'keypress click change blur enter', =>
        @update()
      @controller = new Textarea @$surface
    init: ->
      # Enable TAB and SHIFT+TAB feature with jQuery tabby plugin
      @$element.tabby() if $.fn.tabby?
      super()
    relocate: ->
      super()
      # quickfix for IE 6 and 7, because they don't know '100%' mean.
      if Jencil.utils.detector.browser is 'Explorer' and Jencil.utils.detector.version < 8
        @$surface.height @$element.height()
    getValue: ->
      @controller.getValue()
    setValue: (value) ->
      @controller.setValue value
namespace 'Jencil.editor', (exports) ->
  DualPaneEditorBase = Jencil.editor.DualPaneEditorBase
  PreviewPane = Jencil.editor.pane.PreviewPane
  TextareaPane = Jencil.editor.pane.TextareaPane
  exports.TextEditor = class TextEditor extends DualPaneEditorBase
    @extras:
      options:
        previewPosition: 'right'
        previewTemplatePath: '~/extras/templates/preview.html'
        defaultPreviewState: 'open'
    constructor: (jencil) ->
      if jencil.options.extras.previewPosition in ['top', 'left']
        lhspane = @preview = new PreviewPane jencil, @
        rhspane = @textarea = new TextareaPane jencil, @
      else
        lhspane = @textarea = new TextareaPane jencil, @
        rhspane = @preview = new PreviewPane jencil, @
      super jencil, 'jencil-text-editor', lhspane, rhspane
      @$element.addClass "jencil-preview-position-#{@jencil.options.extras.previewPosition}"
      @setValue @jencil.getSourceValue()
      @preview.hide() if @jencil.options.extras.defaultPreviewState is 'close'
      # Add event
      @textarea.update =>
        @jencil.setSourceValue @getValue()
        @preview.update()
    relocate: ->
      super()
      # quickfix for IE 8. Without this code, only IE 8 hung up after switched
      # from different editor.
      if Jencil.utils.detector.browser is 'Explorer' and Jencil.utils.detector.version is 8
        document.selection.createRange().select()
    getValue: ->
      @textarea.getValue()
    setValue: (value) ->
      @textarea.setValue value
    getSelection: ->
      return @textarea.controller.getSelection()
    setSelection: (start, end) ->
      @textarea.controller.setSelection start, end
    getSelected: ->
      return @textarea.controller.getSelected()
    replaceSelected: (str, select=false) ->
      @textarea.controller.replaceSelected str, select
    insertBeforeSelected: (str, select=false) ->
      @textarea.controller.insertBeforeSelected str, select
    insertAfterSelected: (str, select=false) ->
      @textarea.controller.insertAfterSelected str, select
    wrapSelected: (before, after, select=false, additional=undefined) ->
      @textarea.controller.wrapSelected before, after, select, additional
# --- Add extra buttons for TextEditor
namespace 'Jencil.button', (exports) ->
  Widget = Jencil.widget.Widget
  ButtonBase = Jencil.button.ButtonBase
  exports.MarkupButtonBase = class MarkupButtonBase extends ButtonBase
    clickAfter: ->
      # Update editor
      @editor().update()
  # --- markup buttons
  exports.SimpleMarkupButton = class SimpleMarkupButton extends MarkupButtonBase
    constructor: (jencil, args) ->
      [cls, name, @before, @after, @insert] = args
      super jencil, cls, name
    click: ->
      @editor().wrapSelected @before, @after, true, @insert or @jencil.options.defaultInsertText
  exports.MultilineMarkupButton = class MultilineMarkupButton extends MarkupButtonBase
    constructor: (jencil, args) ->
      [cls, name, @before, @after, @blockBefore, @blockAfter] = args
      super jencil, cls, name
    click: ->
      selectedLines = @editor().getSelected().split '\n'
      offset = if selectedLines[0] is @blockBefore then 1 else 0
      for i in [0...selectedLines.length]
        # format {{i}} to line number
        _before = Jencil.utils.string.format @before, {i: i+1-offset}
        _after = Jencil.utils.string.format @after, {i: i+1-offset}
        line = selectedLines[i]
        if line is @blockBefore or line is @blockAfter
          # ignore blockBefore or blockAfter line
          continue
        if line.startsWith(_before) and line.endsWith(_after)
          # remove markup
          selectedLines[i] = line.substring(_before.length, line.length-_after.length)
        else
          # add markup
          selectedLines[i] = "#{_before}#{line}#{_after}"
      if @blockBefore isnt undefined
        if selectedLines[0] is @blockBefore then selectedLines.shift() else selectedLines.unshift @blockBefore
      if @blockAfter isnt undefined
        if selectedLines[selectedLines.length-1] is @blockAfter then selectedLines.pop() else selectedLines.push @blockAfter
      replace = selectedLines.join '\n'
      @editor().replaceSelected replace, true
  # --- prompt buttons
  exports.LinkMarkupButton = class LinkMarkupButton extends MarkupButtonBase
    constructor: (jencil, args) ->
      [@formatstr] = args
      super jencil, 'link', 'Link'
    click: ->
      href = prompt "Please input link url"
      if href is null then return
      label = prompt "Please input link label", @editor().getSelected()
      if label is null then return
      title = prompt "(Optional) Please input link title"
      if title is null then return
      insert = Jencil.utils.string.format @formatstr, 
        href: href
        label: label
        title: title
      @editor().replaceSelected insert
  exports.ImageMarkupButton = class ImageMarkupButton extends MarkupButtonBase
    constructor: (jencil, args) ->
      [@formatstr] = args
      super jencil, 'image', 'Image'
    click: ->
      src = prompt "Please input image src url"
      if src is null then return
      alt = prompt "(Optional) Please input image alt label", @editor().getSelected()
      if alt is null then return
      title = prompt "(Optional) Please input image title"
      if title is null then return
      insert = Jencil.utils.string.format @formatstr, 
        src: src
        alt: alt
        title: title
      @editor().replaceSelected insert

###
Jencil RichEditor

A Dualpane WYSIWYG Editor with TextareaPane

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- Jencil.widget (jencil.widget.js)
- Jencil.editor (jencil.editor.js)
- Jencil.editor.pane (jencil.editor.pane.js)
- Jencil.editor.pane.TextareaPane (jencil.texteditor.js)
- Jencil.button (jencil.button.js)

Dependencies:
- Jencil.utils.detector (jencil.utils.js)
- Textarea (textarea.js)
###
namespace 'Jencil.editor.pane', (exports) ->
  EditorPane = Jencil.editor.pane.EditorPane
  exports.RichareaPane = class RichareaPane extends EditorPane
    constructor: (jencil, editor) ->
      super jencil, 'jencil-richarea-pane', editor
      @$element.css position: 'relative'
      @$surface = $('<iframe>').addClass 'surface'
      @$surface.appendTo @$element
      @$surface.css
        width: '100%'
        height: '100%'
        border: 'none'
        margin: 0
        padding: 0
      if @jencil.options.extras.richareaTemplatePath?
        src = @jencil.options.extras.richareaTemplatePath
        @$surface.attr 'src', Jencil.utils.path.abspath src
      if Jencil.utils.detector.browser is 'Explorer'
        # quickfix for IE border issue
        @$surface.attr 'frameborder', 0
      @controller = null
    init: ->
      @controller = new Richarea @$surface
      # Add construct code which will be called after richarea get ready
      @controller.ready =>
        @relocate()
        @$body = $(@controller.raw.body)
        @$body.css {margin: 0, padding: 0}
        @$body.bind 'keypress change click blur enter', =>
          @update()
        RichareaPane.__super__.init.call @
    relocate: ->
      super()
      # quickfix for IE 6 and 7, because they don't know '100%' mean.
      if Jencil.utils.detector.browser is 'Explorer' and Jencil.utils.detector.version < 8
        @$surface.height @$element.height()
      # quickfix for IE body height issue
      if Jencil.utils.detector.browser is 'Explorer' and Jencil.utils.detector.version < 9
        @$body.height @$surface.height()
    getValue: ->
      if @controller?.ready() then return @controller.getValue()
    setValue: (value) ->
      if @controller?.ready() then @controller.setValue value
namespace 'Jencil.editor', (exports) ->
  DualPaneEditorBase = Jencil.editor.DualPaneEditorBase
  TextareaPane = Jencil.editor.pane.TextareaPane
  RichareaPane = Jencil.editor.pane.RichareaPane
  exports.RichEditor = class RichEditor extends DualPaneEditorBase
    @extras:
      options:
        richareaTemplatePath: '~/extras/templates/richarea.html'
    constructor: (jencil) ->
      if jencil.options.extras.previewPosition in ['top', 'left']
        lhspane = @preview = new TextareaPane jencil, @
        rhspane = @richarea = new RichareaPane jencil, @
      else
        lhspane = @richarea = new RichareaPane jencil, @
        rhspane = @preview = new TextareaPane jencil, @
      super jencil, 'jencil-rich-editor', lhspane, rhspane
      @$element.addClass "jencil-preview-position-#{@jencil.options.extras.previewPosition}"
      @preview.hide() if @jencil.options.extras.defaultPreviewState is 'close'
    init: ->
      super()
      @richarea.controller.ready =>
        @setValue @jencil.getSourceValue()
        @preview.setValue @getValue()
        # Add event
        @richarea.update =>
          @jencil.setSourceValue @getValue()
          @preview.setValue @getValue()
        @preview.update =>
          @jencil.setSourceValue @preview.getValue()
          @richarea.setValue @preview.getValue()
        @update()
    getValue: ->
      @richarea.getValue()
    setValue: (value) ->
      @richarea.setValue value
# --- Add extra buttons for TextEditor
namespace 'Jencil.button', (exports) ->
  ButtonBase = Jencil.button.ButtonBase
  MarkupButtonBase = Jencil.button.MarkupButtonBase
  exports.CommandButton = class CommandButton extends MarkupButtonBase
    constructor: (jencil, args) ->
      [name, cls, @command, @args] = args
      super jencil, name, cls
    click: ->
      @exec @command, @args
    exec: (command, args) ->
      if @editor().richarea.controller?
        @editor().richarea.controller.execCommand command, args
  exports.PromptCommandButton = class PromptCommandButton extends CommandButton
    constructor: (jencil, args) ->
      [name, cls, command, @message, @defaultValue] = args
      super jencil, [name, cls, command, undefined]
    click: ->
      value = prompt @message, @defaultValue or ''
      if value is null then return
      @exec @command, value
