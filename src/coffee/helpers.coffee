class BaseHelper extends Panel
  constructor: (core, selector='<div>', context) ->
    super core, selector, context
    @element.addClass('helper')


class TemplateHelper extends BaseHelper
  constructor: (core) ->
    super core
    @templatePath = @core.options.helperTemplatePath
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
    @iframe.loadTemplate = (templatePath) ->
      $.ajax
        url: templatePath
        success: (data) =>
          @write data

  init: ->
    @iframe.init()
    @iframe.loadTemplate @templatePath if @templatePath?

  adjust: ->
    @iframe.outerWidth @element.width()
    @iframe.outerHeight @element.height()
    return @


namespace 'Jencil.helpers', (exports) ->
  exports.BaseHelper = BaseHelper
  exports.TemplateHelper = TemplateHelper
