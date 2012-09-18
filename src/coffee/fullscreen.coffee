class Fullscreen extends Panel
  constructor: (core) ->
    super core
    @element.addClass 'fullscreen'
    @element.css
      'position': 'fixed'
      'top': '0'
      'left': '0'
      'width': '100%'
      'height': '100%'
    @curtain = $('<div>').addClass('curtain')
    @curtain.css
      'position': 'absolute'
      'top': '0'
      'left': '0'
      'width': '100%'
      'height': '100%'
      'background': 'black'
      'opacity': '0.6'
      'cursor': 'pointer'
    @cell = $('<div>').css
      'position': 'absolute'
      'top': '5%'
      'left': '5%'
      'width': '90%'
      'height': '90%'
    # IE doesn't support 'fixed'
    if $.browser.msie and $.browser.version < 7
      @element.css 'position', 'absolute'
      $(window).scroll => @element.css 'top', $(document).scrollTop()
    @curtain.click => @off()
    @element.append @curtain
    @element.append @cell
    @element.hide()

    @resize = => @core.wrapper.adjust()

  on: ->
    ratio = 9.0 / 10
    @cell.append @core.wrapper.element
    @core.wrapper.element.outerWidth true, @element.width() * ratio
    @core.wrapper.element.outerHeight true, @element.height() * ratio
    @core.wrapper.init()
    @core.wrapper.adjust()
    # force=true update
    @core.wrapper.workspace.update(true)
    @element.fadeIn('fast', =>
      @core.wrapper.element.css 'width', "100%"
      @core.wrapper.element.css 'height', "100%"
      @core.wrapper.adjust()
    )
    # resize event
    $(window).on 'resize', @resize

  off: ->
    @core.element.after @core.wrapper.element
    @core.wrapper.element.css 'width', ""
    @core.wrapper.element.css 'height', ""
    @core.wrapper.init()
    @core.wrapper.adjust()
    # force=true update
    @core.wrapper.workspace.update(true)
    @element.fadeOut('fast')
    # resize event
    $(window).unbind 'resize', @resize

  toggle: (callbackOn, callbackOff) ->
    if @element.is(':visible')
      @off()
      callbackOff?()
    else
      @on()
      callbackOn?()
