###
Jencil filetype for HTML

###

class HtmlEditor extends Jencil.ui.widgets.editors.TextEditor
  h1: ->
    @wrap "<h1>", "</h1>"
  h2: ->
    @wrap "<h2>", "</h2>"
  h3: ->
    @wrap "<h3>", "</h3>"
  h4: ->
    @wrap "<h4>", "</h4>"
  h5: ->
    @wrap "<h5>", "</h5>"
  h6: ->
    @wrap "<h6>", "</h6>"
  bold: ->
    @wrap "<b>", "</b>"
  italic: ->
    @wrap "<i>", "</i>"
  underline: ->
    @wrap "<u>", "</u>"
  strike: ->
    @wrap "<s>", "</s>"
  superscript: ->
    @wrap "<sup>", "</sup>"
  subscript: ->
    @wrap "<sub>", "</sub>"
  anchor: ->
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
  indent: ->
    text = @selection()
    text = ("  #{x}" for x in text.split("\n"))
    text.unshift("<div style='margin-left: 4em'>")
    text.push("</div>")
    @selection text.join("\n")
  outdent: ->
    text = @selection()
    text = ("  #{x}" for x in text.split("\n"))
    text.unshift("<div style='margin-left: -4em'>")
    text.push("</div>")
    @selection text.join("\n")

HtmlViewer = Jencil.ui.widgets.viewers.TemplateViewer

class HtmlProfile extends Jencil.profiles.Profile
  constructor: ->
    @mainPanelClass = Jencil.ui.widgets.panels.DimainPanel
    @editorClass = HtmlEditor
    @viewerClass = HtmlViewer
    @helperClass = Jencil.ui.widgets.panels.Panel

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
      ['anchor', 'Anchor link'],
      ['image', 'Image'],
      ['unorderedList', 'Unordered list'],
      ['orderedList', 'Ordered list'],
      ['indent', 'Indent'],
      ['outdent', 'Outdent'],
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

