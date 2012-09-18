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
    @textarea.selection = new Selection(window.document, @textarea.get(0))
    @textarea.tabby({'tabString': '    '}) if $.fn.tabby? and @core.options.enableTabIndent
    @textarea.autoindent = (e) =>
      if e.which == 13
        # store the snapshot
        @core.caretaker.save()
        # add newline with leading spaces
        line = @textarea.selection.line()
        # call preNewLineCallback
        @textarea.autoindent.preCallback?(e, line)
        # Add newline and leading white spaces
        indent = line.replace(/^(\s*).*$/, "$1")
        insert = "\n#{indent}"
        @textarea.selection.insertAfter(insert, false)
        # call postNewLineCallback()
        @textarea.autoindent.postCallback?(e, line, indent, insert)
        @textarea.focus()
        # cancel bubbling
        e.stopPropagation()
        e.stopImmediatePropagation()
        # stop default
        e.preventDefault()
        # call change event
        @change()
        return false
    @textarea.on 'keydown', (e) => @textarea.autoindent(e) if @core.options.enableAutoIndent
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


namespace 'Jencil.ui.widgets.editors', (exports) ->
  exports.BaseEditor = BaseEditor
  exports.TextEditor = TextEditor
