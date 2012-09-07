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

  init: ->
    @splitter.init()
    @fst.init()
    @snd.init()


class VerticalPanel extends MultiplePanel
  constructor: (core, fst, snd, defaultVolume=0.5) ->
    splitter = new VerticalSplitter(core, fst, snd, defaultVolume)
    super core, fst, snd, splitter
    @element.addClass 'vertical'

  adjust: ->
    @fst.element.outerHeight @element.height()
    @snd.element.outerHeight @element.height()
    @splitter.element.outerHeight @element.height()
    @splitter.adjust()
    return @


class HorizontalPanel extends MultiplePanel
  constructor: (core, fst, snd, defaultVolume=0.5) ->
    splitter = new HorizontalSplitter(core, fst, snd, defaultVolume)
    super core, fst, snd, splitter
    @element.addClass 'horizontal'

  adjust: ->
    @fst.element.outerWidth @element.width()
    @snd.element.outerWidth @element.width()
    @splitter.element.outerWidth @element.width()
    @splitter.adjust()
    return @
