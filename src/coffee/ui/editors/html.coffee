class HtmlEditor extends TextEditor
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
    @selection "<a href='#{href}'>#{text}</a>"
  image: ->
    src = window.prompt("Please input a image url", "http://")
    alt = window.prompt("(Optional) Please input a alt message", "Image")
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

  alignLeft: ->
    text = @selection()
    text = ("  #{x}" for x in text.split("\n"))
    text.unshift("<div style='text-align: left'>")
    text.push("</div>")
    @selection text.join("\n")

  alignCenter: ->
    text = @selection()
    text = ("  #{x}" for x in text.split("\n"))
    text.unshift("<div style='text-align: center'>")
    text.push("</div>")
    @selection text.join("\n")

  alignRight: ->
    text = @selection()
    text = ("  #{x}" for x in text.split("\n"))
    text.unshift("<div style='text-align: right'>")
    text.push("</div>")
    @selection text.join("\n")

  alignJustify: ->
    text = @selection()
    text = ("  #{x}" for x in text.split("\n"))
    text.unshift("<div style='text-align: justify'>")
    text.push("</div>")
    @selection text.join("\n")
