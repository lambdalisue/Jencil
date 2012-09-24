class BaseEditor extends Panel
  constructor: (core, selector='<div>', context) ->
    super core, selector, context
    @element.addClass('editor')
    # Change event stack
    @_changeCallbacks = []

  val: (value) -> throw new Error("NotImplementedError")

  change: (callback) ->
    if callback?
      @_changeCallbacks.push callback
      return @
    # call all registered callbacks
    callback.call(@, @val()) for callback in @_changeCallbacks
    return @

  # markup commands
  h1: null
  h2: null
  h3: null
  h4: null
  h5: null
  h6: null
  bold: null
  italic: null
  underline: null
  strike: null
  superscript: null
  subscript: null
  anchor: null
  image: null
  unorderedList: null
  orderedList: null


class TextEditor extends BaseEditor
  constructor: (core, selector='<div>', context) ->
    super core, selector, context
    # Textarea
    @textarea = $('<textarea>').appendTo(@element).css
      'margin': '0'
      'padding': '0'
      'border': 'none'
      'outline': 'none'
      'resize': 'none'
    @textarea = evolute(@textarea)
    # Store memento everytime when RETURN key is downed so user can undo
    # This must be called before autoIndentable because autoIndent feature
    # kill event bubbling
    @textarea.on 'keydown', (e) =>
      return if e.which isnt 13
      @core.caretaker.save()
    # Add tab feature
    if $.fn.tabby? and @core.options.enableTabIndent
      @textarea.tabby({'tabString': @core.options.tabString})
    # Add auto indent feature (it will also add textarea.selection automatically)
    @textarea = autoIndentable(@textarea)
    @textarea.autoIndent.disable() if not @core.options.enableAutoIndent
    # Call `change()` method everytime when the textarea is updated
    @textarea.on 'keypress keyup click blur', => @change()

  val: (value) ->
    if value?
      @textarea.val(value)
      @change()
      return @
    return @textarea.val()

  focus: ->
    @textarea.focus()
    return @

  # be originator
  createMemento: ->
    return @val()

  # be originator
  setMemento: (memento) ->
    return @val(memento)

  adjust: ->
    @textarea.outerWidth @element.width()
    @textarea.outerHeight @element.height()
    return @

  selection: (str, keepSelection=true) ->
    if str?
      @textarea.selection.text(str, keepSelection)
      @core.caretaker.save()
      return @change()
    return @textarea.selection.text()

  enclose: (b, a, keepSelection=true) ->
    caret = @textarea.selection.caret()
    if caret[0] == caret[1]
      # select current line before
      @textarea.selection.selectWholeCurrentLine()
    @textarea.selection.enclose(b, a, keepSelection)
    @core.caretaker.save()
    return @change()

  insertBefore: (str, keepSelection=true) ->
    caret = @textarea.selection.caret()
    if caret[0] == caret[1]
      # select current line before
      @textarea.selection.selectWholeCurrentLine()
    @textarea.selection.insertBefore(str, keepSelection)
    @core.caretaker.save()
    return @change()

  insertAfter: (str, keepSelection=true) ->
    caret = @textarea.selection.caret()
    if caret[0] == caret[1]
      # select current line before
      @textarea.selection.selectWholeCurrentLine()
    @textarea.selection.insertAfter(str, keepSelection)
    @core.caretaker.save()
    return @change()


namespace 'Jencil.editors', (exports) ->
  exports.BaseEditor = BaseEditor
  exports.TextEditor = TextEditor
