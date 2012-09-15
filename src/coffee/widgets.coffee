class Widget
  constructor: (@core, selector='<div>', context) ->
    if selector instanceof jQuery
      @element = selector
    else
      @element = $(selector, context)
    @element = evolute(@element)

  init: -> @
  adjust: -> @


class Panel extends Widget
  constructor: (core, selector='<div>', context) ->
    super core, selector, context
    @element.addClass 'panel'


class MultiplePanel extends Panel
  constructor: (core, @fst, @snd, @splitter) ->
    super core
    @element.addClass 'multiple'
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


  init: ->
    @splitter.init()
    @fst.init()
    @snd.init()

  _togglePanel: (to, callbackOn, callbackOff) ->
      volume = @splitter.volume()
      callbackDone = null
      if 0 < volume < 1
        end = to
        @splitter._previousVolume = volume
        callbackDone = callbackOff
      else
        end = @splitter._previousVolume or @splitter.defaultVolume
        end = 0.5 if end == to
        callbackDone = callbackOn
      animate
        done: callbackDone
        start: volume
        end: end
        duration: 500
        callback: (value, epoch) => @splitter.volume value


class VerticalPanel extends MultiplePanel
  constructor: (core, fst, snd, defaultVolume=0.5) ->
    splitter = new VerticalSplitter(core, fst, snd, defaultVolume)
    super core, fst, snd, splitter
    @element.addClass 'vertical'

  adjust: ->
    @fst.element.outerHeight true, @element.height()
    @snd.element.outerHeight true, @element.height()
    @splitter.element.outerHeight true, @element.height()
    @splitter.adjust()
    return @


class HorizontalPanel extends MultiplePanel
  constructor: (core, fst, snd, defaultVolume=0.5) ->
    splitter = new HorizontalSplitter(core, fst, snd, defaultVolume)
    super core, fst, snd, splitter
    @element.addClass 'horizontal'

  adjust: ->
    @fst.element.outerWidth true, @element.width()
    @snd.element.outerWidth true, @element.width()
    @splitter.element.outerWidth true, @element.width()
    @splitter.adjust()
    return @

namespace 'Jencil.ui.widgets', (exports) ->
  exports.Widget = Widget

namespace 'Jencil.ui.widgets.panels', (exports) ->
  exports.Panel = Panel
  exports.MultiplePanel = MultiplePanel
  exports.VerticalPanel = VerticalPanel
  exports.HorizontalPanel = HorizontalPanel
