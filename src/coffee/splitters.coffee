class Splitter extends Widget
  constructor: (core, @fst, @snd, @defaultVolume=0.5) ->
    super core
    @element.addClass 'splitter'

    # regulate volume without reconstruct
    @_volume = @defaultVolume

    # events
    mousemove = (e) =>
      @mousemove e
      # update curtain div
      @fst.curtain?.refresh()
      @snd.curtain?.refresh()
      # cancel bubbling
      e.stopPropagation()
      e.stopImmediatePropagation()
      # stop default
      e.preventDefault()
    mouseup = (e) =>
      $window = $(window)
      $window.unbind 'mousemove', mousemove
      $window.unbind 'mouseup', mouseup
      # hide curtain div
      @fst.curtain?.off()
      @snd.curtain?.off()
      # cancel bubbling
      e.stopPropagation()
      e.stopImmediatePropagation()
      # stop default
      e.preventDefault()
    @element.mousedown (e) =>
      $window = $(window)
      $window.mousemove mousemove
      $window.mouseup mouseup
      # show curtain div
      @fst.curtain?.on()
      @snd.curtain?.on()
      # cancel bubbling
      e.stopPropagation()
      e.stopImmediatePropagation()
      # stop default
      e.preventDefault()

  init: ->
    @container = evolute @element.parent()
    return @

  volume: (value, skip=false) ->
    if value?
      @_volume = value
      @adjust() if not skip
      return @
    return @_volume

  value: (value, skip=false) ->
    valueWidth = @valueWidth()
    if value?
      volume = value / valueWidth
      return @volume(volume, skip)
    return @volume() * valueWidth

  regulateValue: (value) ->
    minValue = @minValue()
    maxValue = @maxValue()
    value = minValue if value < minValue
    value = maxValue if value > maxValue
    return value


class VerticalSplitter extends Splitter
  constructor: (core, fst, snd, defaultVolume) ->
    super core, fst, snd, defaultVolume
    @element.addClass 'vertical'
    @fst.element.addClass 'left'
    @snd.element.addClass 'right'
    @fst.element.css {'float': 'left'}
    @snd.element.css {'float': 'left'}

    @fst.curtain?.css 'pointer', 'col-resize'
    @snd.curtain?.css 'pointer', 'col-resize'

  mousemove: (e) ->
    offset = @container.absoluteX() + @container.contentX(true)
    value = e.pageX - offset
    value = @regulateValue(value)
    @value(value)

  valueWidth: ->
    return @container.width()

  minValue: ->
    m1 = @fst.element.minWidth() + @fst.element.nonContentWidth()
    m2 = @snd.element.maxWidth()
    m2 = @valueWidth() - (m2 + @snd.element.nonContentWidth()) if m2?
    if m1? and m2?
      return Math.max(m1, m2)
    return m1 or m2 or 0

  maxValue: ->
    valueWidth = @valueWidth()
    m1 = @fst.element.maxWidth()
    m1 = m1 + @fst.element.nonContentWidth() if m1?
    m2 = @snd.element.minWidth() + @snd.element.nonContentWidth()
    m2 = valueWidth - m2 if m2?
    if m1? and m2?
      return Math.min(m1, m2)
    return m1 or m2 or valueWidth

  adjust: ->
    value = @value()
    valueWidth = @valueWidth()
    # arrange fst/snd panels
    fstValue = value - @fst.element.nonContentWidth(true)
    sndValue = (valueWidth - value) - @snd.element.nonContentWidth(true)
    if fstValue <= 0
      @fst.element.hide() if @fst.element.is(':visible')
      @snd.element.show() if not @snd.element.is(':visible')
      @snd.element.outerWidth true, valueWidth
      @_value = value = 0
    else if sndValue <= 0
      @fst.element.show() if not @fst.element.is(':visible')
      @snd.element.hide() if @snd.element.is(':visible')
      @fst.element.outerWidth true, valueWidth
      @_value = value = valueWidth
    else
      @fst.element.show() if not @fst.element.is(':visible')
      @snd.element.show() if not @snd.element.is(':visible')
      @fst.element.width fstValue
      @snd.element.width sndValue
    @fst.adjust()
    @snd.adjust()
    # arrange splitter bar
    @element.relativeX(value - @element.outerWidth()/2)
    return @


class HorizontalSplitter extends Splitter
  constructor: (core, fst, snd, defaultVolume) ->
    super core, fst, snd, defaultVolume
    @element.addClass 'horizontal'
    @fst.element.addClass 'top'
    @snd.element.addClass 'bottom'

    @fst.curtain?.css 'pointer', 'raw-resize'
    @snd.curtain?.css 'pointer', 'raw-resize'

  mousemove: (e) ->
    offset = @container.absoluteY() + @container.contentY(true)
    value = e.pageY - offset
    value = @regulateValue(value)
    @value(value)

  valueWidth: ->
    return @container.height()

  minValue: ->
    m1 = @fst.element.minHeight() + @fst.element.nonContentHeight()
    m2 = @snd.element.maxHeight()
    m2 = @valueWidth() - (m2 + @snd.element.nonContentHeight()) if m2?
    if m1? and m2?
      return Math.max(m1, m2)
    return m1 or m2 or 0

  maxValue: ->
    valueWidth = @valueWidth()
    m1 = @fst.element.maxHeight()
    m1 = m1 + @fst.element.nonContentHeight() if m1?
    m2 = @snd.element.minHeight() + @snd.element.nonContentHeight()
    m2 = valueWidth - m2 if m2?
    if m1? and m2?
      return Math.min(m1, m2)
    return m1 or m2 or valueWidth

  adjust: ->
    value = @value()
    valueWidth = @valueWidth()
    # arrange fst/snd panels
    fstValue = value - @fst.element.nonContentHeight(true)
    sndValue = (valueWidth - value) - @snd.element.nonContentHeight(true)
    if fstValue <= 0
      @fst.element.hide() if @fst.element.is(':visible')
      @snd.element.show() if not @snd.element.is(':visible')
      @snd.element.outerHeight true, valueWidth
      @_value = value = 0
    else if sndValue <= 0
      @fst.element.show() if not @fst.element.is(':visible')
      @snd.element.hide() if @snd.element.is(':visible')
      @fst.element.outerHeight true, valueWidth
      @_value = value = valueWidth
    else
      @fst.element.show() if not @fst.element.is(':visible')
      @snd.element.show() if not @snd.element.is(':visible')
      @fst.element.height fstValue
      @snd.element.height sndValue
    @fst.adjust()
    @snd.adjust()
    # arrange splitter bar
    @element.relativeY(value - @element.outerHeight()/2)
    return @

namespace 'Jencil.splitters', (exports) ->
  exports.Splitter = Splitter
  exports.VerticalSplitter = VerticalSplitter
  exports.HorizontalSplitter = HorizontalSplitter
