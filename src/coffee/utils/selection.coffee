class Selection
  constructor: (@document, @element) -> @

  _getCaret: ->
    if @document.selection? # Internet Explorer
      range = @document.selection.createRange()
      clone = range.duplicate()
      clone.moveToElementText @element
      clone.setEndPoint 'EndToEnd', range
      s = clone.text.length - range.text.length
      e = s + range.text.length
    else if @element.setSelectionRange? # W3C
      s = @element.selectionStart
      e = @element.selectionEnd
    caret = [s, e]
    return caret
  _setCaret: (start, end) ->
    scrollTop = @element.scrollTop
    if @element.setSelectionRange?
      @element.setSelectionRange start, end
    else if @element.createTextRange
      # Internet Explorer
      range = @element.createTextRange()
      range.collapse true
      range.moveStart 'character', start
      range.moveEnd 'character', end-start
      range.select()
    @element.focus()
    @element.scrollTop = scrollTop
    return @

  caret: (start, end) ->
    if start? and start instanceof Array
      end = start[1]
      start = start[0]
    if start? and not end?
      end = start
    if start? and end?
      return @_setCaret start, end
    return @_getCaret()

  caretOffset: (offset) ->
    caret = @caret()
    return @caret(caret[0]+offset)

  replace: (str, start, end) ->
    scrollTop = @element.scrollTop
    b = @element.value.substring 0, start
    a = @element.value.substring end
    @element.value = b + str + a
    @element.scrollTop = scrollTop
    return @

  _getText: ->
    if @document.selection?
      # Internet Explorer
      range = @document.selection.createRange()
      return range.text
    else if @element.setSelectionRange
      [s, e] = @caret()
      return @element.value.substring s, e
    return null
  _setText: (str, keepSelection) ->
    scrollTop = @element.scrollTop
    [s, e] = @caret()
    @replace str, s, e
    # set new selection
    e = s + str.length
    s = e if not keepSelection
    @caret s, e
    @element.focus()
    @element.scrollTop = scrollTop
    return @

  text: (str, keepSelection) ->
    if str?
      return @_setText(str, keepSelection)
    return @_getText()

  insertBefore: (str, keepSelection) ->
    scrollTop = @element.scrollTop
    [s, e] = @caret()
    text = @text()
    @replace str + text, s, e
    # set new selection
    e = s + str.length
    s = e if not keepSelection
    @caret s, e
    @element.focus()
    @element.scrollTop = scrollTop
    return @

  insertAfter: (str, keepSelection) ->
    scrollTop = @element.scrollTop
    [s, e] = @caret()
    text = @text()
    @replace text + str, s, e
    # set new selection
    s = e
    e = e + str.length
    s = e if not keepSelection
    @caret s, e
    @element.focus()
    @element.scrollTop = scrollTop
    return @

  enclose: (lhs, rhs, keepSelection) ->
    scrollTop = @element.scrollTop
    text = @text()
    if text.indexOf(lhs) is 0 and text.lastIndexOf(rhs) is (text.length - rhs.length)
      # already wrapped, remove existing wrapping
      str = text.substring lhs.length, text.length - rhs.length
      @text str, keepSelection
    else
      [s, e] = @caret()
      @replace lhs + text + rhs, s, e
      e = s + lhs.length + text.length + rhs.length
      s = e if not keepSelection
      @caret s, e
    @element.focus()
    @element.scrollTop = scrollTop
    return @

  lineCaret: (pos) ->
    pos = pos or @caret()[0]
    value = @element.value
    s = value.lastIndexOf("\n", pos - 1) + 1
    e = value.indexOf("\n", pos)
    e = value.length if e == -1
    return [s, e]

  _getLine: ->
    [s, e] = @lineCaret()
    return @element.value.substring s, e
  _setLine: (line, keepSelection) ->
    scrollTop = @element.scrollTop
    [s, e] = @lineCaret()
    @replace line, s, e
    e = s + line.length
    s = e if not keepSelection
    @caret s, e
    @element.focus()
    @element.scrollTop = scrollTop
    return @

  line: (value, keepSelection) ->
    if value?
      return @_setLine(value, keepSelection)
    return @_getLine()

  selectWholeLine: (pos) ->
    [s, e] = @lineCaret(pos)
    return @caret s, e

  selectWholeCurrentLine: ->
    return @selectWholeLine(null)
