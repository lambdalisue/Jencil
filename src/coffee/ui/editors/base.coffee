class Editor extends Panel
  constructor: (core, selector, context) ->
    super core, selector, context
    @element.addClass 'editor'
    @_updateCallbacks = []

  focus: ->
    throw "NotImplementedError"

  getValue: ->
    throw "NotImplementedError"

  setValue: ->
    throw "NotImplementedError"

  update: (callback) ->
    if callback?
      @_updateCallbacks.push callback
      return @
    for callback in @_updateCallbacks
      callback.call(@, @getValue())

  # be originator
  createMemento: ->
    return @getValue()

  # be originator
  setMemento: (memento) ->
    return @setValue(memento)


class TextPanel extends Panel
  constructor: (core) ->
    super core, '<textarea>'
    @element.css
      margin: '0'
      padding: '0'
      border: 'none'
      outline: 'none'
      resize: 'none'
    @element.tabby() if $.fn.tabby?
    @helper = new Textarea(window.document, @element.get(0))

  caret: (start, end) ->
    return @helper.selection.caret(start, end)

  selection: (value) ->
    if value?
      return @helper.selection.replaceSelection(value, true)
    return @helper.selection.text()

  insertBefore: (str) ->
    return @helper.selection.insertBeforeSelection(str, true)

  insertAfter: (str) ->
    return @helper.selection.insertAfterSelection(str, true)

  wrap: (before, after) ->
    return @helper.selection.wrapSelection(before, after, true)


class TextEditor extends Editor
  constructor: (core) ->
    super core
    @textPanel = new TextPanel(core)
    @element.append @textPanel.element
    @textPanel.element.on 'keyup keypress click blur', => @update()
    @textPanel.element.on 'keyup', (e) => 
      if e.which == 13
        # record the changes
        dummyCommand = new DummyCommand(@)
        @core.caretaker.invoke(dummyCommand)

  adjust: ->
    @textPanel.element.outerWidth @element.width()
    @textPanel.element.outerHeight @element.height()
    @textPanel.adjust()
    return @

  focus: ->
    @textPanel.element.focus()
    return @

  getValue: ->
    return @textPanel.helper.val()

  setValue: (value) ->
    @textPanel.helper.val(value)
    @update()
    return @

  caret: (start, end) ->
    @textPanel.focus()
    return @textPanel.caret(start, end)

  selection: (value) ->
    if value?
      @textPanel.selection(value)
      @update()
      return @
    return @textPanel.selection(value)

  insertBefore: (str) ->
    @textPanel.insertBefore(str)
    @update()

  insertAfter: (str) ->
    @textPanel.insertAfter(str)
    @update()

  wrap: (before, after) ->
    @textPanel.wrap(before, after)
    @update()
