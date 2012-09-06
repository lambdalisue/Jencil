class MarkdownViewer extends TemplateViewer
  update: (value) ->
    super window.markdown.toHTML(value)
