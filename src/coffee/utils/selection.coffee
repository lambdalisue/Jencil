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
    return [s, e]
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
    if start? and typeof start is 'array'
      end = start[1]
      start = start[0]
    if start? and not end?
      end = start
    if start? and end?
      return @_setCaret start, end
    return @_getCaret()

  caretMove: (offset) ->
    [s, e] = @caret()
    return @caret(s+offset, e+offset)

  lineCaret: ->
    [s, e] = @caret()
    value = @element.value
    s = value.lastIndexOf("\n", s - 1) + 1
    e = value.indexOf("\n", s)
    e = value.length if e == -1
    return [s, e]

  _replace: (str, start, end) ->
    scrollTop = @element.scrollTop
    if @document.selection # MSIE and Opera
      @element.focus()
      range = document.selection.createRange()
      range.text = str
      range.select()
    else if @element.setSelectionRange # Gecko and Webkit
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
    @_replace str, s, e
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

  line: ->
    value = @element.value
    [s, e] = @lineCaret()
    return value.substr(s, e-s)

  insertBefore: (str, keepSelection) ->
    scrollTop = @element.scrollTop
    [s, e] = @caret()
    text = @text()
    @_replace str + text, s, e
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
    @_replace text + str, s, e
    # set new selection
    s = e
    e = e + str.length
    s = e if not keepSelection
    @caret s, e
    @element.focus()
    @element.scrollTop = scrollTop
    return @

  wrap: (b, a, keepSelection) ->
    scrollTop = @element.scrollTop
    text = @text()
    if text.indexOf(b) is 0 and text.lastIndexOf(a) is (text.length - a.length)
      str = text.substring b.length, text.length - a.length
      @text str, keepSelection
    else
      [s, e] = @caret()
      @_replace b + text + a, s, e
      e = s + b.length + text.length + a.length
      s = e if not keepSelection
      @caret s, e
    @element.focus()
    @element.scrollTop = scrollTop
    return @
