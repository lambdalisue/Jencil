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
    @wrap "**", "**"

  italic: ->
    @wrap "*", "*"

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
    
  indent: ->
    text = @selection()
    text = ("  #{x}" for x in text.split("\n"))
    text.unshift("")
    text.push("")
    @selection text.join("\n")
