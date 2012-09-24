autoIndentableHtml = do ->
  PATTERNS = ([
    x,
    new RegExp("^[\s\t]*<#{x}>"),
    new RegExp("</#{x}>[\s\t]*$"),
  ] for x in ['p', 'li'])

  pre = (e, line) ->
    console.log "@", @
    return if e.shiftKey
    for pattern in PATTERNS
      if pattern[1].test(line) or pattern[2].test(line)
        # move caret to end of the line
        lineCaret = @selection._getLineCaret()
        @selection.caret(lineCaret[1])
        return
  post = (e, line, indent, insert) ->
    return if e.shiftKey
    for pattern in PATTERNS
      if pattern[2].test(line)
        # Add new tag and move caret to the center of the tag
        x = pattern[0]
        @selection.insertAfter("<#{x}></#{x}>", false)
        @selection.caretOffset(-(3+x.length))
        return
  return (textarea) ->
    textarea = autoIndentable(textarea) if not textarea.autoIndent?
    textarea.autoIndent.pre = (e, line) ->
      pre.call(textarea, e, line)
    textarea.autoIndent.post = (e, line, indent, insert) ->
      post.call(textarea, e, line, indent, insert)
    return textarea

headerMarkup = do ->
  PATTERN = new RegExp("^<h([1-6])>(.*)</h[1-6]>\n?$")
  return (n) ->
    caret = @textarea.selection.caret()
    if caret[0] == caret[1]
      # nothing is selected so select whole current line before execute
      @textarea.selection.selectWholeCurrentLine()
    text = @selection()
    if PATTERN.test(text)
      # it has already Header tag. Remove or replace existing tag
      if RegExp.$1 == n.toString()
        replacement = RegExp.$2
      else
        replacement = "<h#{n}>#{RegExp.$2}</h#{n}>"
      @selection(replacement)
    else
      @enclose "<h#{n}>", "</h#{n}>\n"

class HtmlEditor extends TextEditor
  constructor: (core) ->
    super core
    # Use custom autoIndentable in this editor
    @textarea = autoIndentableHtml(@textarea)

  h1: -> headerMarkup.call(@, 1)
  h2: -> headerMarkup.call(@, 2)
  h3: -> headerMarkup.call(@, 3)
  h4: -> headerMarkup.call(@, 4)
  h5: -> headerMarkup.call(@, 5)
  h6: -> headerMarkup.call(@, 6)
  bold: -> @enclose "<b>", "</b>"
  italic: -> @enclose "<i>", "</i>"
  underline: -> @enclose "<u>", "</u>"
  strike: -> @enclose "<s>", "</s>"
  superscript: -> @enclose "<sup>", "</sup>"
  subscript: -> @enclose "<sub>", "</sub>"
  quote: -> @enclose "<q>", "</q>"
  blockquote: -> @enclose "\n<blockquote>", "</blockquote>\n"
  code: -> @enclose "<code>", "</code>"
  pre: -> @enclose "<pre>", "</pre>"

  anchorLink: ->
    text = @selection()
    if not text
      text = window.prompt("Please input a link text", "Here")
    href = window.prompt("Please input a link url", "http://")
    return if not href?
    @selection "<a href='#{href}'>#{text}</a>"
  image: ->
    src = window.prompt("Please input a image url", "http://")
    alt = window.prompt("(Optional) Please input a alt message", "Image")
    return if not src?
    @selection "<img src='#{src}' alt='#{alt}'>"
  unorderedList: ->
    text = @selection()
    text = ("  <li>#{x}</li>" for x in text.split("\n"))
    text.unshift("<ul>")
    text.push("</ul>")
    @selection text.join("\n")
  orderedList: ->
    text = @selection()
    text = ("  <li>#{x}</li>" for x in text.split("\n"))
    text.unshift("<ol>")
    text.push("</ol>")
    @selection text.join("\n")

namespace 'Jencil.ui.widgets.editors', (exports) ->
  exports.HtmlEditor = HtmlEditor
