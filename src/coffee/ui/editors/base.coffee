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


class TextareaPanel extends Panel
  constructor: (core) ->
    super core, '<textarea>'
    @textarea = new Textarea(window.document, @element.get(0))
    @selection = @textarea.selection
    @element.css
      margin: '0'
      padding: '0'
      border: 'none'
      outline: 'none'
      resize: 'none'
    # Enable tab indent
    @element.tabby({'tabString': '    '}) if $.fn.tabby?
    # Enable auto indent
    @element.on 'keydown', (e) => 
      if e.which == 13
        # get the number of leading spaces of current line
        line = @selection.line()
        if /^\s*/.test(line)
          indent = line.match(/^\s*/)[0]
        else
          indent = ""
        insert = "\n#{indent}"
        command = new Command @, =>
          @selection.insertAfter(insert, false)
          @focus()
        @core.caretaker.invoke(command)
        # cancel bubbling
        e.stopPropagation()
        e.stopImmediatePropagation()
        # stop default 
        e.preventDefault()
        return false

  val: (value) ->
    if value?
      @textarea.val(value)
      return @
    return @textarea.val()

  selection: (value) ->
    return @selection.text(value, true)

  insertBefore: (str) ->
    return @selection.insertBefore(str, true)

  insertAfter: (str) ->
    return @selection.insertAfter(str, true)

  wrap: (before, after) ->
    return @selection.wrap(before, after, true)

  focus: ->
    @element.focus()
    return @

  # be originator
  createMemento: ->
    return @val()

  # be originator
  setMemento: (memento) ->
    return @val(memento)


class TextEditor extends Editor
  constructor: (core) ->
    super core
    @textPanel = new TextareaPanel(core)
    @element.append @textPanel.element
    @textPanel.element.on 'keyup keypress click blur', => @update()

  adjust: ->
    @textPanel.element.outerWidth @element.width()
    @textPanel.element.outerHeight @element.height()
    @textPanel.adjust()
    return @

  focus: ->
    @textPanel.focus()
    return @

  getValue: ->
    return @textPanel.val()

  setValue: (value) ->
    @textPanel.val(value)
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
