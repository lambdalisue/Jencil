namespace 'Jencil.widgets', (exports) ->
  exports.Widget = class Widget
    constructor: (@jencil, cls, type='div') ->
      if type instanceof jQuery
        @$element = type.addClass cls
      else
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
    getProfileName: ->
      if @$documentTypeElement?
        return @$documentTypeElement.val()
      return @jencil.defaultProfileName
    update: ->
      profileName = @getProfileName()
      @jencil.buttonHolder.update profileName
  exports.ButtonHolder = class ButtonHolder extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil-button-holder'
      @update @jencil.options.defaultProfileName
    update: (profileName) ->
      delete Jencil.profile # force reload
      url = "#{@jencil.options.profileSetPath}/#{profileName}.js"
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
  exports.Workspace = class Workspace extends Widget
    constructor: (jencil) ->
      super jencil, 'jencil-workspace'
  exports.Editor = class Editor extends Widget
    constructor: (jencil, cls, type) ->
      super jencil, cls, type
    getValue: ->
      throw new Error "Subclass must override this method."
    getSelection: ->
      throw new Error "Subclass must override this method."
    setSelection: (start, end) ->
      throw new Error "Subclass must override this method."
    getSelected: ->
      throw new Error "Subclass must override this method."
    replaceSelected: (str, select=false) ->
      throw new Error "Subclass must override this method."
    insertBeforeSelected: (str, select=false) ->
      throw new Error "Subclass must override this method."
    insertAfterSelected: (str, select=false) ->
      throw new Error "Subclass must override this method."
    wrapSelected: (before, after, select=false, additional=undefined) ->
      throw new Error "Subclass must override this method."
      


