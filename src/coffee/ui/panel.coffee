class Panel extends Widget
  constructor: (core, selector='<div>', context) ->
    super core, selector, context
    @element.addClass 'panel'


class VerticalPanel extends Panel
  constructor: (core, @fst, @snd, @defaultVolume=0.5) ->
    super core
    @element.addClass 'vertical'
    @fst = @fst or new Panel(core)
    @snd = @snd or new Panel(core)
    @splitter = new VerticalSplitter core, @fst, @snd, @defaultVolume
    @element.append @fst.element
    @element.append @splitter.element
    @element.append @snd.element

  init: ->
    @splitter.init()
    @fst.init()
    @snd.init()

  adjust: ->
    @fst.element.outerHeight @element.height()
    @snd.element.outerHeight @element.height()
    @splitter.element.outerHeight @element.height()
    @splitter.adjust()
    return @


class HorizontalPanel extends Panel
  constructor: (core, @fst, @snd, @defaultVolume=0.5) ->
    super core
    @element.addClass 'horizontal'
    @fst = @fst or new Panel(core)
    @snd = @snd or new Panel(core)
    @splitter = new HorizontalSplitter core, @fst, @snd, @defaultVolume
    @element.append @fst.element
    @element.append @splitter.element
    @element.append @snd.element

  init: ->
    @splitter.init()
    @fst.init()
    @snd.init()

  adjust: ->
    @fst.element.outerWidth @element.width()
    @snd.element.outerWidth @element.width()
    @splitter.element.outerWidth @element.width()
    @splitter.adjust()
    return @


class Fullscreen extends Panel
  constructor: (core) ->
    super core
    @element.addClass('fullscreen')
    @element.css
      'display': 'table'
      'position': 'fixed'
      'top': '0'
      'left': '0'
      'width': '100%'
      'height': '100%'
    # IE doesn't support 'fixed'
    if $.browser.msie and $.browser.version < 7
      @element.css 'position', 'absolute'
      $(window).scroll => @element.css 'top', $(document).scrollTop()
    @curtain = $('<div>').addClass('curtain')
    @curtain.css
      'position': 'absolute'
      'top': '0'
      'left': '0'
      'width': '100%'
      'height': '100%'
      'background': 'black'
      'opacity': '0.6'
    @curtain.click => @hide()
    @cell = $('<div>').css
      'display': 'table-cell'
      'vertical-align': 'middle'
      'width': '95%'
      'height': '95%'
    @element.append @curtain
    @element.append @cell
    @element.hide()

  show: ->
    @_width = @core.wrapper.element.css('width')
    @_height = @core.wrapper.element.css('height')
    @core.wrapper.element.css 'width', '90%'
    @core.wrapper.element.css 'height', '90%'
    @cell.append @core.wrapper.element
    @element.fadeIn('fast', =>
      @core.init()
      @core.adjust()
    )

  hide: ->
    @core.wrapper.element.css 'width', @_width
    @core.wrapper.element.css 'height', @_height
    @core.element.after @core.wrapper.element
    @element.fadeOut('fast', =>
      @core.init()
      @core.adjust()
    )
