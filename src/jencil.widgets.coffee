namespace 'Jencil.widgets', (exports) ->
  exports.Widget = class Widget
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
  exports.DocumentType = class DocumentType extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil-document-type'
      @$documentTypeElement = @jencil.options.documentTypeElement
      if @$documentTypeElement?
        @$element.append @$documentTypeElement
        @$documentTypeElement.change =>
          @update()
        @update()
    update: ->
      profileName = @$documentTypeElement.val()
      @jencil.buttonHolder.update profileName
  exports.ButtonHolder = class ButtonHolder extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil-button-holder'
      @update @jencil.options.defaultProfileName
    update: (profileName) ->
      delete Jencil.profile # force reload
      url = "#{@jencil.options.profileSetUrl}/#{profileName}.js"
      check = 'Jencil.profile'
      Jencil.utils.load [[url, check]], =>
        @$element.children().remove()
        for buttonset in Jencil.profile.buttonsets
          type = buttonset[0]
          args = buttonset[1..buttonset.length]
          button = Jencil.widgets.createButton @jencil, type, args
          @append button
  exports.Toolbar = class Toolbar extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil-toolbar'
  exports.EditorArea = class EditorArea extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil-editor-area'
      @$element.addClass "preview-#{@jencil.options.previewPosition}"
