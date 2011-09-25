namespace 'Jencil.widgets', (exports) ->
  exports.Widget = class Widget
    ###
    An abstruct class of all widget
    ###
    constructor: (@jencil, cls, type='div') ->
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
    ###
    Jencil toplevel wrapper widget
    ###
    constructor: (jencil) ->
      super jencil, 'jencil'
  exports.DocumentType = class DocumentType extends Widget
    ###
    Jencil document type widget
    ###
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
      return @jencil.options.defaultProfileName
  exports.ButtonHolder = class ButtonHolder extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil-button-holder'
    update: () ->
      @$element.children().remove()
      for buttonset in @jencil.profile.buttonsets
        type = buttonset[0]
        args = buttonset[1..buttonset.length]
        button = Jencil.buttons.createButton @jencil, type, args
        @append button
  exports.Toolbar = class Toolbar extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil-toolbar'
  exports.Workspace = class Workspace extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil-workspace'
