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
  indent: null
  outdent: null


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
    @textarea.tabby({'tabString': '    '}) if $.fn.tabby?
    @textarea.autoindent = (e) =>
      if e.which == 13
        # store the snapshot
        @core.caretaker.save()
        # add newline with leading spaces
        line = @textarea.selection.line()
        indent = line.replace(/^(\s*).*$/, "$1")
        insert = "\n#{indent}"
        @textarea.selection.insertAfter(insert, false)
        @textarea.focus()
        # cancel bubbling
        e.stopPropagation()
        e.stopImmediatePropagation()
        # stop default
        e.preventDefault()
        # call change event
        @change()
        return false
    @textarea.on 'keydown', (e) => @textarea.autoindent(e)
    @textarea.on 'click blur', => @change()

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

  wrap: (b, a, keepSelection=true) ->
    @textarea.selection.wrap(b, a, keepSelection)
    @core.caretaker.save()
    @change()
    return @

  selection: (str, keepSelection=true) ->
    if str?
      @textarea.selection.text(str, keepSelection)
      @core.caretaker.save()
      @change()
      return @
    return @textarea.selection.text()
  
  insertBefore: (str, keepSelection=true) ->
    @textarea.selection.insertBefore(str, keepSelection)
    @core.caretaker.save()
    return @

  insertAfter: (str, keepSelection=true) ->
    @textarea.selection.insertAfter(str, keepSelection)
    @core.caretaker.save()
    return @

namespace 'Jencil.ui.widgets.editors', (exports) ->
  exports.BaseEditor = BaseEditor
  exports.TextEditor = TextEditor
