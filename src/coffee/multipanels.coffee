class MultiPanel extends Panel
  constructor: (core, @fst, @snd, @splitter) ->
    super core
    @element.addClass 'multi'
    @element.append @fst.element
    @element.append @splitter.element
    @element.append @snd.element
    # Add toggle/show/hide method
    show = (callback) ->
      @toggle(callback, null) if not @element.is(':visible')
    hide = (callback) ->
      @toggle(null, callback) if @element.is(':visible')
    @fst.toggle = (callbackOn, callbackOff) =>
      @_togglePanel(0, callbackOn, callbackOff)
    @fst.show = show
    @fst.hide = hide
    @snd.toggle = (callbackOn, callbackOff) =>
      @_togglePanel(1, callbackOn, callbackOff)
    @snd.show = show
    @snd.hide = hide
    @splitter.element.dblclick => @snd.toggle()

  init: ->
    @splitter.init()
    @fst.init()
    @snd.init()

  _togglePanel: (to, callbackOn, callbackOff) ->
    return if MultiPanel._animating
    volume = @splitter.volume()
    callbackDone = null
    if 0 < volume < 1
      end = to
      @splitter._previousVolume = volume
      _callbackDone = callbackOff
    else
      end = @splitter._previousVolume or @splitter.defaultVolume
      end = 0.5 if end == to
      _callbackDone = callbackOn
    MultiPanel._animating = true
    callbackDone = ->
      MultiPanel._animating = false
      _callbackDone?()
    animate
      start: volume
      end: end
      duration: 500
      callbackEach: (value, epoch) => @splitter.volume value
      callbackDone: callbackDone


class VerticalPanel extends MultiPanel
  constructor: (core, fst, snd, defaultVolume=0.5) ->
    splitter = new VerticalSplitter(core, fst, snd, defaultVolume)
    super core, fst, snd, splitter
    @element.addClass 'vertical'

  adjust: ->
    @fst.element.outerHeight true, @element.height()
    @snd.element.outerHeight true, @element.height()
    @splitter.element.outerHeight true, @element.height()
    # splitter will call @fst.adjust and @snd.adjust
    @splitter.adjust()
    return @


class HorizontalPanel extends MultiPanel
  constructor: (core, fst, snd, defaultVolume=0.5) ->
    splitter = new HorizontalSplitter(core, fst, snd, defaultVolume)
    super core, fst, snd, splitter
    @element.addClass 'horizontal'

  adjust: ->
    @fst.element.outerWidth true, @element.width()
    @snd.element.outerWidth true, @element.width()
    @splitter.element.outerWidth true, @element.width()
    # splitter will call @fst.adjust and @snd.adjust
    @splitter.adjust()
    return @


namespace 'Jencil.multipanels', (exports) ->
  exports.MultiPanel = MultiPanel
  exports.VerticalPanel = VerticalPanel
  exports.HorizontalPanel = HorizontalPanel
