class Fullscreen extends Panel
  constructor: (core) ->
    super core
    @element.addClass 'fullscreen'
    @element.css
      'display': 'table'
      'position': 'fixed'
      'top': '0'
      'left': '0'
      'width': '100%'
      'height': '100%'
    @curtain = evolute $('<div>').addClass('curtain')
    @curtain.css
      'position': 'absolute'
      'top': '0'
      'left': '0'
      'width': '100%'
      'height': '100%'
      'background': 'black'
      'opacity': '0.6'
    @cell = evolute $('<div>').css
      'display': 'table-cell'
      'vertical-align': 'middle'
      'width': '95%'
      'height': '95%'
    # IE doesn't support 'fixed'
    if $.browser.msie and $.browser.version < 7
      @element.css 'position', 'absolute'
      $(window).scroll => @element.css 'top', $(document).scrollTop()
    @curtain.click => @off()
    @element.append @curtain
    @element.append @cell
    @element.hide()

    @resize = =>
      @core.wrapper.adjust()

  on: ->
    @_width = @core.wrapper.element.css('width')
    @_height = @core.wrapper.element.css('height')
    @core.wrapper.element.css 'width', '90%'
    @core.wrapper.element.css 'height', '90%'
    @cell.append @core.wrapper.element
    @element.fadeIn('fast', =>
      @core.wrapper.init()
      @core.wrapper.adjust()
      @core.wrapper.workspace.update(true)
    )
    $(window).on 'resize', @resize

  off: ->
    @core.wrapper.element.css 'width', @_width
    @core.wrapper.element.css 'height', @_height
    @core.element.after @core.wrapper.element
    @element.fadeOut('fast', =>
      @core.wrapper.init()
      @core.wrapper.adjust()
      @core.wrapper.workspace.update(true)
    )
    $(window).unbind 'resize', @resize

  toggle: (callbackOn, callbackOff) ->
    if @element.is(':visible')
      @off()
      callbackOff?()
    else
      @on()
      callbackOn?()
