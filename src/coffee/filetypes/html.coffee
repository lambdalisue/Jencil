class HtmlEditor extends Jencil.ui.widgets.editors.TextEditor
  constructor: (core) ->
    super core
    singleLineTags = ([
      "<#{x}>",                   # Open        0
      "</#{x}>"                   # Close       1
      new RegExp("^\s*<#{x}>"),   # Open Regex  2
      new RegExp("</#{x}>\s*$"),  # Close Regex 3
    ] for x in ['p', 'li'])
    @textarea.autoindent.preCallback = (e, line) =>
      return if e.shiftKey
      for pattern in singleLineTags
        if (pattern[3]).test(line)
          # move caret to end of the line
          lineCaret = @textarea.selection._getLineCaret()
          @textarea.selection.caret(lineCaret[1])
          return
    @textarea.autoindent.postCallback = (e, line) =>
      return if e.shiftKey
      for pattern in singleLineTags
        if (pattern[3]).test(line)
          # Add new tag and move caret to the center of the tag
          @textarea.selection.insertAfter("#{pattern[0]}#{pattern[1]}", false)
          @textarea.selection.caretOffset(-pattern[1].length)
          return


  @_headerPattern: new RegExp("^<h([1-6])>(.*)</h[1-6]>\n?$")
  _header: (n) ->
    caret = @textarea.selection.caret()
    if caret[0] == caret[1]
      # select current line before
      @textarea.selection.selectWholeCurrentLine()
    text = @selection()
    if HtmlEditor._headerPattern.test(text)
      # remove or replace existing tag
      if RegExp.$1 == n.toString()
        replacement = RegExp.$2
      else
        replacement = "<h#{n}>#{RegExp.$2}</h#{n}>"
      @selection(replacement)
    else
      @enclose "<h#{n}>", "</h#{n}>\n"
  h1: ->          @_header(1)
  h2: ->          @_header(2)
  h3: ->          @_header(3)
  h4: ->          @_header(4)
  h5: ->          @_header(5)
  h6: ->          @_header(6)
  bold: ->        @enclose "<b>", "</b>"
  italic: ->      @enclose "<i>", "</i>"
  underline: ->   @enclose "<u>", "</u>"
  strike: ->      @enclose "<s>", "</s>"
  superscript: -> @enclose "<sup>", "</sup>"
  subscript: ->   @enclose "<sub>", "</sub>"
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

HtmlViewer = Jencil.ui.widgets.viewers.TemplateViewer

class HtmlHelper extends Jencil.ui.widgets.panels.Panel
  constructor: (core) ->
    super core
    @element.addClass 'helper'

class HtmlProfile extends Jencil.profiles.Profile
  constructor: ->
    @mainPanelClass = Jencil.ui.widgets.panels.TrimainPanel
    @editorClass = HtmlEditor
    @viewerClass = HtmlViewer
    @helperClass = HtmlHelper 
    @defaultVolume = 1
    @defaultVolume2 = 1

    @toolbarButtons = [
      'Undo', 'Redo', 'Separator',
      ['h1', 'H1'],
      ['h2', 'H2'],
      ['h3', 'H3'],
      ['h4', 'H4'],
      ['h5', 'H5'],
      ['h6', 'H6'],
      'Separator',
      ['bold', 'Bold', 'Ctrl+B'],
      ['italic', 'Italic', 'Ctrl+I'],
      ['underline', 'Underline', 'Ctrl+U'],
      ['strike', 'Strikeout'],
      ['superscript', 'Superscript'],
      ['subscript', 'Subscript'],
      'Separator',
      ['anchorLink', 'Anchor link'],
      ['image', 'Image'],
      ['unorderedList', 'Unordered list'],
      ['orderedList', 'Ordered list'],
      ['quote', 'Quote'],
      ['blockquote', 'Blockquote'],
      ['code', 'Code'],
      ['pre', 'Pre'],
      'Separator',
      'Fullscreen',
    ]
    @statusbarButtons = [
      'Viewer',
      'Helper',
    ]

# Export
Jencil.utils.namespace 'Jencil.filetypes.html', (exports) ->
  exports.HtmlEditor = HtmlEditor
  exports.HtmlViewer = HtmlViewer
  exports.HtmlProfile = HtmlProfile
