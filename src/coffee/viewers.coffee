class BaseViewer extends Panel
  constructor: (core, selector='<div>', context) ->
    super core, selector, context
    @element.addClass('viewer')

  update: (value, force) ->
    throw new Error("NotImplementedError")


class TemplateViewer extends BaseViewer
  constructor: (core) ->
    super core
    @templatePath = @core.options.viewerTemplatePath
    @element.css
      'position': 'relative'
    @curtain = curtainFactory(@element)
    @iframe = $('<iframe>').appendTo(@element).css
      margin: '0'
      padding: '0'
      border: 'none'
      outline: 'none'
      resize: 'none'
      width: '100%'
      height: '100%'
      overflow: 'visible'
    @iframe.attr 'frameborder', 0
    @iframe = evolute(@iframe)
    @iframe.init = ->
      iframe = @get(0)
      if iframe.contentDocument?
        @document = iframe.contentDocument
      else
        @document = iframe.contentWindow.document
      @document.write '<body></body>'
    @iframe.write = (value) ->
      if @document?
        try
          scrollTop = @document.documentElement.scrollTop
        catch e
          scrollTop = 0
        @document.open()
        @document.write value
        @document.close()
        @document.documentElement.scrollTop = scrollTop
        # resize
        @width @document.scrollLeft
        @height @document.scrollTop
        return true
      return false
    @iframe.loadTemplate = (templatePath, value) ->
      $.ajax
        url: templatePath
        success: (data) =>
          @_template = data
          @write value

  init: ->
    @iframe.init()

  update: (value, force) ->
    if @iframe._template?
      value = @iframe._template.replace("{{content}}", value)
    else if @templatePath?
      # load template
      @iframe.loadTemplate @templatePath, value
    return @iframe.write value

  adjust: ->
    @iframe.outerWidth @element.width()
    @iframe.outerHeight @element.height()
    return @


class AjaxViewer extends TemplateViewer
  constructor: (core, @config) ->
    super core

    @config = jQuery.extend({
      type: 'GET'
      dataType: 'text'
      data: (value) -> encodeURIComponent(value)
      url: null
    }, @config)

  update: (value, force) ->
    if @_valueCache isnt value or force
      @_valueCache = value
      $.ajax
        type: @config.type
        dataType: @config.dataType
        data: JSON.stringify(@config.data(value))
        url: @config.url
        success: (value) =>
          if @iframe._template?
            value = @iframe._template.replace("{{content}}", value)
          else if @templatePath?
            # load template
            @iframe.loadTemplate @templatePath, value
          return @iframe.write value


namespace 'Jencil.ui.widgets.viewers', (exports) ->
  exports.BaseViewer = BaseViewer
  exports.TemplateViewer = TemplateViewer
  exports.AjaxViewer = AjaxViewer
