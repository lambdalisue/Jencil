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
