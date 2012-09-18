class MarkdownViewer extends AjaxViewer
  constructor: (core) ->
    config =
      type: 'POST'
      dataType: 'text'
      data: (value) ->
        text: value
        mode: 'markdown'
      url: 'https://api.github.com/markdown'
    super core, config

class GithubFlavorMarkdownViewer extends AjaxViewer
  constructor: (core) ->
    config =
      type: 'POST'
      dataType: 'text'
      data: (value) ->
        text: value
        mode: 'gfm'
      url: 'https://api.github.com/markdown'
    super core, config

class MarkdownEditor extends HtmlEditor
  h1: ->
    @insertBefore "# "
  h2: ->
    @insertBefore "## "
  h3: ->
    @insertBefore "### "
  h4: ->
    @insertBefore "#### "
  h5: ->
    @insertBefore "##### "
  h6: ->
    @insertBefore "###### "

  bold: ->
    @enclose "**", "**"

  italic: ->
    @enclose "*", "*"

  anchor: ->
    text = @selection()
    if not text
      text = window.prompt("Please input a link text", "Here")
    href = window.prompt("Please input a link url", "http://")
    @selection "[#{text}](#{href})"

  image: ->
    src = window.prompt("Please input a image url", "http://")
    alt = window.prompt("(Optional) Please input a alt message", "Image")
    @selection "![#{alt}](#{src})"

  unorderedList: ->
    text = @selection()
    text = ("-   #{x}" for x in text.split("\n"))
    text.unshift("")
    text.push("")
    @selection text.join("\n")

  orderedList: ->
    text = @selection()
    text = ("#{i}. #{x}" for x, i in text.split("\n"))
    text.unshift("")
    text.push("")
    @selection text.join("\n")

class MarkdownHelper extends Jencil.ui.widgets.panels.Panel
  constructor: (core) ->
    super core
    @element.addClass 'helper'

class MarkdownProfile extends Jencil.profiles.Profile
  constructor: ->
    @mainPanelClass = Jencil.ui.widgets.panels.TrimainPanel
    @editorClass = MarkdownEditor
    @viewerClass = MarkdownViewer
    @helperClass = MarkdownHelper 
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
      'Separator',
      ['anchor', 'Anchor link'],
      ['image', 'Image'],
      ['unorderedList', 'Unordered list'],
      ['orderedList', 'Ordered list'],
      'Separator',
      'Fullscreen',
    ]
    @statusbarButtons = [
      'Viewer',
      'Helper',
    ]

# Export
Jencil.utils.namespace 'Jencil.filetypes.markdown', (exports) ->
  exports.MarkdownEditor = MarkdownEditor
  exports.MarkdownViewer = MarkdownViewer
  exports.MarkdownProfile = MarkdownProfile
