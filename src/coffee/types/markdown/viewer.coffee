class MarkdownJsViewer extends TemplateViewer
  update: (value, force) ->
    html = window.markdown.toHTML(value)
    super html, force

