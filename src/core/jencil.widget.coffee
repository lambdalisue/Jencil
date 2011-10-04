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
