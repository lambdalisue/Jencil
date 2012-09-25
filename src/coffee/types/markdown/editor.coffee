headerMarkup = do ->
  # Atx-style Header
  atxHeaderPattern = new RegExp('^\s*(#{1,6}\s*).*')
  appendAtxHeader = (segment, n) ->
    header = "#".repeat(n)
    return "#{header} #{segment}"
  removeAtxHeader = (segment) ->
    return segment.replace(/^(\s*)#{1,6}\s*/g, '$1')
  changeAtxHeader = (segment, n) ->
    header = "#".repeat(n)
    return segment.replace(/^(\s*)#{1,6}\s*/g, "$1#{header} ")
  toggleAtxHeader = (textarea, n) ->
    text = textarea.val()
    caret = textarea.selection.caret()
    segment = textarea.selection.text()
    caretOffset = 0
    if atxHeaderPattern.test(segment)
      exists = RegExp.$1.trim()
      if exists.length is n
        # remove the existing Atx Header
        replacement = removeAtxHeader(segment)
      else
        # change the existing Atx Header
        replacement = changeAtxHeader(segment, n)
    else
      # append new Atx Header
      replacement = appendAtxHeader(segment, n)
      if caret[0] > 0 and text[caret[0] - 1] isnt "\n"
        replacement = "\n#{replacement}"
      if caret[1] < text.length and text[caret[1]] isnt "\n"
        replacement = "#{replacement}\n"
        caretOffset = -1
    # save change
    textarea.selection.text replacement
    if caretOffset isnt 0
      textarea.selection.caretOffset(caretOffset)
  # Setext-style Header
  #setextHeaderCharCopyNumber = 20
  #setextHeaderChars = ["=", "-"]
  #setextHeaderPattern = new RegExp('^(?:[\=\-])+$')
  #appendSetextHeader = (segment, n) ->
  #  headerChar = setextHeaderChars[n-1]
  #  header = headerChar.repeat(setextHeaderCharCopyNumber)
  #  return "#{segment}\n#{header}"
  #removeSetextHeader = (segment) ->
  #  return segment.replace(/^(?:[\=\-]*)$/mg, '')
  #changeSetextHeader = (segment, n) ->
  #  headerChar = setextHeaderChars[n-1]
  #  header = headerChar.repeat(setextHeaderCharCopyNumber)
  #  return segment.replace(/^(?:[\=\-]*)$/mg, header)
  #toggleSetextStyleHeader = (textarea, n) ->
  #  text = textarea.val()
  #  caret = textarea.selection.caret()
  #  segment = textarea.selection.text()
  #  caretOffset = 0
  #  if setextHeaderPattern.test(segment)
  #    exists = if segment[0] is '=' then 1 else 2
  #    if exists is n
  #      # remove the existing Setext Header
  #      replacement = removeSetextHeader(segment)
  #    else
  #      # change the existing Setext Header
  #      replacement = changeSetextHeader(segment, n)
  #  else
  #    replacement = appendSetextHeader(segment, n)
  #    if caret[0] > 0 and text[caret[0] - 1] isnt "\n"
  #      replacement = "\n#{replacement}"
  #    if caret[1] < text.length and text[caret[1]] isnt "\n"
  #      replacement = "#{replacement}\n"
  #      caretOffset = -1
  #  # save change
  #  textarea.selection.text replacement
  #  if caretOffset isnt 0
  #    textarea.selection.caretOffset(caretOffset)
  return (n) ->
    @selectWholeLineIfNoSelectionFound()
    toggleAtxHeader(@textarea, n)

autoIndentableMarkdown = do ->
  listPattern = /^(\s*)((?:(?:\d+\.)|(?:[\*\+\->])))(\s+)/
  orderedListPattern = /^(\s*)(\d+)(\.\s+)/
  unorderedListPattern = /^(\s*)([\*\+\->])(\s+)/ # with blockquote pattern

  findListInfo = (line) ->
    if listPattern.test(line)
      leading = RegExp.$1
      mark = RegExp.$2
      spaces = RegExp.$3
      type = if mark.endsWith(".") then 1 else 2
    else if @_listInfo
      return @_listInfo
    else
      type = 0
    return {
      type: type
      leading: leading
      mark: mark
      spaces: spaces
    }

  pre = (e, line) ->
    return if e.shiftKey
    listInfo = findListInfo.call(@, line)
    if listInfo.type in [3, 4]
      # Manually does autoIndent so return true to stop autoIndent
      return true
    if listInfo.type in [1, 2]
      if line.replace(listPattern, '').length is 0
        # remove characters and return true to stop propagation
        @selection.line(line.replace(listPattern, '$1'))
        @_listInfo = null
        return true
      # move caret to end of the line
      lineCaret = @selection.lineCaret()
      @selection.caret(lineCaret[1])

  post = (e, line, indent, insert, cancel) ->
    insert = null
    listInfo = findListInfo.call(@, line)
    if cancel and not e.shiftKey and listInfo.type in [3, 4]
      # Note: the auto indent should have canceled
      # get leading white spaces of the line
      leading = listInfo.mark + listInfo.spaces
      indent = line.replace(/^([\t\s]*).*$/, "$1")
      indent = " ".repeat(indent.length - leading.length)
      # add newline and leading white spaces
      insert = "\n#{indent}"
      @selection.insertAfter(insert, false) if insert?
      cancel = false
    return if cancel
    if e.shiftKey
      if listInfo.type in [1, 2]
        leading = listInfo.mark + listInfo.spaces
        insert = " ".repeat(leading.length)
        @_listInfo = listInfo
        @_listInfo.type += 2
    else if listInfo.type in [1, 3]
      num = parseInt(listInfo.mark.replace(".", ""))
      insert = "#{num+1}.#{listInfo.spaces}"
    else if listInfo.type in [2, 4]
      insert = "#{listInfo.mark}#{listInfo.spaces}"
    @selection.insertAfter(insert, false) if insert?

  return (textarea) ->
    textarea = autoIndentable(textarea) if not textarea.autoIndent?
    textarea.autoIndent.pre = (e, line) ->
      pre.call(textarea, e, line)
    textarea.autoIndent.post = (e, line, indent, insert, cancel) ->
      post.call(textarea, e, line, indent, insert, cancel)
    return textarea


class MarkdownEditor extends TextEditor
  constructor: (core) ->
    super core
    # Use custom autoIndentable in this editor
    @textarea = autoIndentableMarkdown(@textarea)

  selectWholeLineIfNoSelectionFound: ->
    caret = @textarea.selection.caret()
    if caret[0] == caret[1]
      # select current line before
      lineCaret = @textarea.selection.lineCaret()
      line = @textarea.selection.line()
      if /^(\s*[\*\+\-]\s*|^\s*\d+\.\s*|^\s*>\s*)/g.test(line)
        lineCaret[0] += RegExp.$1.length
      @textarea.selection.caret(lineCaret)
    return

  h1: -> headerMarkup.call(@, 1)
  h2: -> headerMarkup.call(@, 2)
  h3: -> headerMarkup.call(@, 3)
  h4: -> headerMarkup.call(@, 4)
  h5: -> headerMarkup.call(@, 5)
  h6: -> headerMarkup.call(@, 6)
  bold: -> @enclose "**", "**"
  italic: -> @enclose "*", "*"
  blockquote: do ->
    pattern1 = /^(\s*)>\s*([^\n]*)$/m
    pattern2 = /^(\s*)([^\n]*)$/m
    match = (lines) ->
      for line in lines
        continue if line.length is 0
        return false if not pattern1.test(line)
      return true
    return ->
      lines = @selection().split("\n")
      if match(lines)
        for i in [0...lines.length]
          line = lines[i]
          lines[i] = line.replace(pattern1, "$1$2")
      else
        for i in [0...lines.length]
          line = lines[i]
          lines[i] = line.replace(pattern2, "$1> $2")
      @selection lines.join("\n")
  code: ->
    lines = @selection().split("\n")
    caret = @textarea.selection.caret()
    if lines.length > 1
      # block code
      text = ("\t#{x}" for x in lines)
      @selection text.join("\n")
    else
      @enclose "`", "`"
  anchorLink: ->
    text = @selection()
    if not text
      text = window.prompt("Please input a link text", "Here")
    href = window.prompt("Please input a link url", "http://")
    return if not href?
    @selection "[#{text}](#{href})"
  image: ->
    src = window.prompt("Please input a image url", "http://")
    alt = window.prompt("(Optional) Please input a alt message", "Image")
    return if not src?
    @selection "![#{alt}](#{src})"
  unorderedList: do ->
    pattern1 = /^(\s*)\*\s*([^\n]*)$/m
    pattern2 = /^(\s*)([^\n]*)$/m
    match = (lines) ->
      for line in lines
        continue if line.length is 0
        return false if not pattern1.test(line)
      return true
    return ->
      lines = @selection().split("\n")
      if match(lines)
        for i in [0...lines.length]
          line = lines[i]
          lines[i] = line.replace(pattern1, "$1$2")
      else
        for i in [0...lines.length]
          line = lines[i]
          lines[i] = line.replace(pattern2, "$1* $2")
      @selection lines.join("\n")
  orderedList: do ->
    pattern1 = /^(\s*)\d+\.\s*([^\n]*)$/m
    pattern2 = /^(\s*)([^\n]*)$/m
    match = (lines) ->
      for line in lines
        continue if line.length is 0
        return false if not pattern1.test(line)
      return true
    return ->
      lines = @selection().split("\n")
      if match(lines)
        for i in [0...lines.length]
          line = lines[i]
          lines[i] = line.replace(pattern1, "$1$2")
      else
        for i in [0...lines.length]
          line = lines[i]
          lines[i] = line.replace(pattern2, "$1#{i+1}. $2")
      @selection lines.join("\n")

namespace 'Jencil.types.markdown.editor.MarkdownEditor', (exports) ->
  exports.MarkdownEditor = MarkdownEditor

