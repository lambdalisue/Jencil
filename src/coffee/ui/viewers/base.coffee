class Viewer extends Panel
  constructor: (core, selector, context) ->
    super core, selector, context
    @element.addClass 'viewer'

  update: (value) ->
    throw "NotImplementedError"


class IframePanel extends Panel
  constructor: (core) ->
    super core, '<iframe>'
    @element.css
      margin: '0'
      padding: '0'
      border: 'none'
      outline: 'none'
      resize: 'none'
      width: '100%'
      height: '100%'
      overflow: 'visible'
    @element.attr 'frameborder', 0

  init: ->
    iframe = @element.get(0)
    if iframe.contentDocument?
      @document = iframe.contentDocument
    else
      @document = iframe.contentWindow.document
    @document.write '<body></body>'
    @element.resize =>
      body = @document.body
      @element.width = body.scrollWidth + (body.offsetWidth - body.clientWidth)
      @element.height = body.scrollHeight + (body.offsetHeight - body.clientHeight)

  write: (content) ->
    if @document?
      try
        scrollTop = @document.documentElement.scrollTop
      catch e
        scrollTop = 0
      @document.open()
      @document.write content
      @document.close()
      @document.documentElement.scrollTop = scrollTop
      # resize
      @element.width @document.scrollLeft
      @element.height @document.scrollTop
      return true
    return false


class TemplatePanel extends IframePanel
  loadTemplate: (templatePath, value) ->
    $.ajax
      url: templatePath
      success: (data) =>
        @_template = data
        @write value

  write: (content) ->
    if @_template?
      content = @_template.replace("{{content}}", content)
    else if @templatePath?
      # load template
      @loadTemplate @templatePath, content
    return super content


class TemplateViewer extends Viewer
  constructor: (core) ->
    super core
    @templatePanel = new TemplatePanel(core)
    @templatePanel.templatePath = @core.options.previewTemplatePath
    @element.append @templatePanel.element

  adjust: ->
    @templatePanel.element.outerWidth @element.width()
    @templatePanel.element.outerHeight @element.height()
    @templatePanel.adjust()
    return @

  update: (value) ->
    @templatePanel.write value
    return @
